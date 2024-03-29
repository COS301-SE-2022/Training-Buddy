import { HttpStatus, Injectable, Param } from '@nestjs/common';
import { Field } from '@nestjs/graphql';
import { UserDto, ActivityStat, Userconfig, ActivityLog, ActivitySchedule } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import * as admin from 'firebase-admin'
import { firestore } from 'firebase-admin';
import passport = require('passport');
import { emit, send } from 'process';
import { async, observable } from 'rxjs';
import internal = require('stream');
import uuid = require('uuid') ;
import { Observable } from 'rxjs';
import fs = require('fs') ;
import {getFirestore, writeBatch} from 'firebase/firestore' ;
import axios from 'axios';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { subscribe } from 'graphql';


@Injectable()
export class ApiInternalApiRepositoryDataAccessService {


    //readonly arrayUnion = FirebaseFirestore.FieldValue.arrayUnion ;
    firestore = new admin.firestore.Firestore() ;
    readonly arrayUnion = firestore.FieldValue.arrayUnion ;
    readonly arrayRemove = firestore.FieldValue.arrayRemove ;
    usersCollection = this.firestore.collection('/Users') ;
    activityLogsCollection = this.firestore.collection('/ActivityLogs') ;
    buddyConnectionsCollection = this.firestore.collection('/BuddyConnections') ;
    buddyRequestsCollection = this.firestore.collection('/BuddyRequests') ;
    scheduledWorkoutCollection = this.firestore.collection('/ScheduledWorkouts') ;
    workoutInvitesCollection = this.firestore.collection('/WorkoutInvites') ;

    async getActivityScheduleCollection() {
        return this.scheduledWorkoutCollection ;
    }
    //USERS
    //users - CREATE
    async createUser(@Param() user: UserDto) {
        const data = {
            id: uuid.v1().toString(),
            userName : user.userName,
            userSurname : user.userSurname,
            email : user.email,
            cellNumber : user.cellNumber,
            dob : user.dob,
            gender : user.gender,
            longitude : user.longitude,
            latitude : user.latitude,
            location : user.location,
            password : user.password,
            buddies: [],
            signUpStage : 0,
            ratings: []
        }

        await this.usersCollection.doc().set(data)
        .then(results =>{
            return data ;
        });
        return data ;
    }

    //users - READ

    async login(@Param() email: string):Promise<any>{
        return this.usersCollection.where('email', '==', email).get().then(async (result) =>{
            if(result.docs[0]){
                let total = 0 ;
                const person = result.docs[0].data();
                if(person.ratings.length > 0){
                    person.ratings.forEach(element => {
                        total += element;
                    });
                    person.rating = Math.round(total/person.ratings.length);
                }
                else{
                    person.rating = 0;
                }
                return person ;
            } ;
            return false ;
        });
    }

    async getUser(@Param() userID:string):Promise<any>{
        return this.usersCollection.where('id', '==', userID).get().then(async (result) =>{
            if(result.docs[0]) return result.docs[0].data() ;
            return false ;
        });
    }

    async getMetrics(@Param() email: string){
        const data = [] ;

        await this.usersCollection.where('email', '!=', email).get().then(async (querySnapshot) =>{
            querySnapshot.docs.forEach((doc) => {
                const metric = [] ;
                metric.push(doc.data().email);
                metric.push(doc.data().metrics) ;
                data.push(metric) ;
            });
        });

        return data ;
    }

    async findAll(@Param() email: string){
        const users = [] ;
        await this.usersCollection.get().then(async (querySnapshot) =>{
            querySnapshot.docs.forEach((doc) => {
                if(doc.data().signUpStage > 0)
                    users.push(doc.data());
            });
        });
        return users ;
    }

    //user - SAVE STRAVA TOKENS

    async findByStravaId(@Param() id: string){
        return this.usersCollection.where('strava.ownerId', '==', id).get().then(async (result) =>{
            if(result.docs[0]) return result.docs[0].data() ;
            return false ;
        });
    }

    async saveTokens(@Param() email: string, @Param() access: string, @Param() refresh: string, @Param() exp: number, @Param() clientId: any, @Param() clientSecret: any, @Param() id:any){
        const data = {

            strava: {
            stravaAccess: access,
            stravaRefresh: refresh,
            exp: exp,
            clientId: clientId,
            clientSecret: clientSecret,
            ownerId: id
            },
            signUpStage: 3
        }

        const toLog = [] ;
            //fetch strava activities
            await this.getActivities(access).then((activities : any) => {
                //console.log(activities.data) ;

                activities.data.forEach(activity => {

                    let valid = false ;
                    let type = "" ;
                    if(activity.type == "Run"){
                        valid = true ;
                        type = "run" ;
                    }else if(activity.type == "Ride"){
                        valid = true ;
                        type = "ride" ;
                    }else if(activity.type == "Swim"){
                        valid = true ;
                        type = "swim" ;
                    }else if(activity.type == "Workout"){
                        valid = true ;
                        type = "lift" ;
                    }

                    //const exists = this.activityExists(activity.id) ;
                    // if(this.activityExists(activity.id)){
                    //     console.log("exists") ;
                    //     valid = false ;
                    // }

                    if(valid){
                        const date = Math.floor(new Date(activity.start_date).getTime() / 1000)

                        //console.log(activity) ;
                        const log = {
                            id: activity.id,
                            user: email,
                            activityType: type,
                            dateComplete: date,
                            distance: activity.distance,
                            name: activity.name,
                            speed: activity.average_speed,
                            time: activity.moving_time
                        }
                        //console.log(log) ;
                        toLog.push(log) ;
                    }
                });
            }) ;

            await this.logManyActivities(toLog) ;

        return this.usersCollection.where('email', '==', email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).set(data, {merge: true}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    async getTokens(@Param() email: string){
        const data = [] ;

        return this.usersCollection.where('email', '==', email).get().then(async (result) => {
                data.push(result.docs[0].data().stravaAccess) ;
                data.push(result.docs[0].data().stravaRefresh) ;
                return data ;
        })
    }

    //user - UPDATE

    async userConfig(@Param() userConfig: Userconfig){

        let run = 0 ;
        let runGroup = -1;
        let ride = 0;
        let rideGroup = -1 ;
        let swim = 0;
        let swimGroup = -1 ;
        let lift = 0 ;
        let liftGroup = -1 ;

        if(userConfig.riding){
            ride = userConfig.riding;
            rideGroup = 0 ;
        }
        if(userConfig.running){
            run = userConfig.running;
            runGroup = 0 ;
        }
        if(userConfig.swimming){
            swim =userConfig.swimming;
            swimGroup = 0 ;
        }
        if(userConfig.weightLifting){
            lift =userConfig.weightLifting;
            liftGroup = 0 ;
        }

        const data = {
            metrics: {
                run : run,
                ride : ride,
                swim : swim,
                lift : lift
            },
            groups: {
                runGroup: runGroup,
                rideGroup: rideGroup,
                swimGroup: swimGroup,
                liftGroup: liftGroup
            },
            distance : userConfig.distance,
            bio : userConfig.bio,
            signUpStage: 1
        }

        return this.usersCollection.where('email', '==', userConfig.email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).set(data, {merge: true}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    async addRating(@Param() email: string, @Param() rating: number){
        return this.usersCollection.where('email', '==', email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).update({ratings: this.arrayUnion(rating)}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    async updateCellNumber(@Param() cellNumber: string, @Param() email: string){
        return this.usersCollection.where('email', '==', email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).update({cellNumber: cellNumber}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    async updateDistance(@Param() distance: number, @Param() email: string){
        return this.usersCollection.where('email', '==', email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).update({distance: distance}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    async updateEmail(@Param() email: string, @Param() oldEmail: string){
        return this.usersCollection.where('email', '==', oldEmail).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).update({email: email}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    async updateLocation(@Param() location: string, @Param() email: string){
        return this.usersCollection.where('email', '==', email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).update({location: location}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    async updatePassword(@Param() password: string, @Param() email: string){
        return this.usersCollection.where('email', '==', email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).update({password: password}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    async updateUserName(@Param() userName: string, @Param() email: string){
        return this.usersCollection.where('email', '==', email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).update({userName: userName}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    async updateUserSurname(@Param() userSurname: string, @Param() email: string){
        return this.usersCollection.where('email', '==', email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).update({userSurname: userSurname}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    async updateLongitude(@Param() long: number, @Param() email: string){
        return this.usersCollection.where('email', '==', email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).update({longitude: long}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    async updateLatitude(@Param() latitude: number, @Param() email: string){
        return this.usersCollection.where('email', '==', email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).update({latitude: latitude}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    async updateRunning(@Param() run: boolean, @Param() email: string){
        let r = 0 ;
        if(run)
            r = 1 ;
        return this.usersCollection.where('email', '==', email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).update({"metrics.run": r}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    async updateRiding(@Param() ride: boolean, @Param() email: string){
        let r = 0 ;
        if(ride)
            r = 1 ;
        return this.usersCollection.where('email', '==', email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).update({"metrics.ride": r}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    async updateSwimming(@Param() swim: boolean, @Param() email: string){
        let r = 0 ;
        if(swim)
            r = 1 ;
        return this.usersCollection.where('email', '==', email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).update({"metrics.swim": r}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    async updateLifting(@Param() lift: boolean, @Param() email: string){
        let r = 0 ;
        if(lift)
            r = 1 ;
        return this.usersCollection.where('email', '==', email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).update({"metrics.lift": r}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    async updateBio(@Param() bio: string, @Param() email: string){
        return this.usersCollection.where('email', '==', email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).update({bio: bio}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    async updateAccessToken(@Param() token: string, @Param() email: string){
        return this.usersCollection.where('email', '==', email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).update({"strava.stravaAccess": token}).then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    //user - DELETE

    //TODO: implement


    //ACTIVITY LOGS

    //activity logs - CREATE
    async logStrava(@Param() activityId: any, @Param() ownerId: any){

        console.log("repo reached") ;
        const user = await this.findByStravaId(ownerId) ;

        if(user){
            //check if token is expired
            console.log("exists");
            if((user.strava.exp < Date.now()/1000)){
                //get new token
                await this.getNewToken(user.strava.stravaRefresh, user.strava.clientId, user.strava.clientSecret).then((access : any) => {
                    console.log(access.data.access_token) ;
                    this.updateAccessToken(access.data.access_token, user.email).then((newAccess) => {
                        axios.get('https://www.strava.com/api/v3/activities/' + activityId + '?access_token=' + newAccess).then((res : any) => {
                            console.log("new access token", res) ;
                            let valid = false ;
                            let type = "" ;
                            if(res.data.type == "Run"){
                                valid = true ;
                                type = "run" ;
                            }else if(res.data.type == "Ride"){
                                valid = true ;
                                type = "ride" ;
                            }else if(res.data.type == "Swim"){
                                valid = true ;
                                type = "swim" ;
                            }else if(res.data.type == "Workout"){
                                valid = true ;
                                type = "lift" ;
                            }

                            if(valid){
                                const date = new Date(res.data.start_date) ;
                                const log = {
                                    id: res.data.id,
                                    user: user.email,
                                    activityType: type,
                                    dateComplete: date,
                                    distance: res.data.distance,
                                    name: res.data.name,
                                    speed: res.data.average_speed,
                                    time: res.data.moving_time
                                }
                                //console.log(log) ;
                                this.activityLogsCollection.doc().set(log) ;
                            }
                        })
                    }) ;
                });
            }else{
                const origAccess = user.strava.stravaAccess ;
                axios.get('https://www.strava.com/api/v3/activities/' + activityId + '?access_token=' + origAccess).then((res : any) => {
                    console.log("old access token", res) ;
                    let valid = false ;
                    let type = "" ;
                    if(res.data.type == "Run"){
                        valid = true ;
                            type = "run" ;
                        }else if(res.data.type == "Ride"){
                            valid = true ;
                            type = "ride" ;
                        }else if(res.data.type == "Swim"){
                            valid = true ;
                            type = "swim" ;
                        }else if(res.data.type == "Workout"){
                            valid = true ;
                            type = "lift" ;
                        }
                        if(valid){
                            const date = new Date(res.data.start_date) ;
                            const log = {
                                id: res.data.id,
                                user: user.email,
                                activityType: type,
                                dateComplete: date,
                                distance: res.data.distance,
                                name: res.data.name,
                                speed: res.data.average_speed,
                                time: res.data.moving_time
                            }
                            //console.log(log) ;
                            this.activityLogsCollection.doc().set(log) ;
                        }
                })
            }
        }
    }

    async logActivity(@Param() log: ActivityLog){
        const data = {
            user: log.email,
            activityType: log.activityType,
            dateComplete: log.dateCompleted,
            distance: log.distance,
            name: log.name,
            speed: log.speed,
            time: log.time
        }

        await this.activityLogsCollection.doc().set(data)
        .then(results =>{
            return true ;
        });
        return false ;
    }

    async logManyActivities(@Param() logs: any[]){
        const batch = firestore().batch() ;
        logs.forEach(log => {
            const docRef = this.activityLogsCollection.doc() ;
            batch.set(docRef, log) ;
        });

        await batch.commit() ;
        return true ;
    }

    async activityExists(@Param() id: number){
        return await this.activityLogsCollection.where('id', '==', id).get().then(async (result) =>{
            if(result.docs[0]){
                //console.log(result.docs[0]);
                return true ;
            }
            return false ;
        });
    }

    //activity logs - READ
    async getActivities(accessToken : any) {
        return new Promise((resolve, reject) => {

            axios.get('https://www.strava.com/api/v3/athlete/activities?per_page=20&access_token=' + accessToken).then((res : any) => {
                resolve(res);
            });

        });
    }

    async getNewToken(refreshToken : any, clientId: any, clientSecret: any) {
        return new Promise((resolve, reject) => {

            const payload = {'client_id': clientId, 'client_secret': clientSecret, 'grant_type': 'refresh_token', 'refresh_token': refreshToken} ;


            axios.post('https://www.strava.com/api/v3/oauth/token', payload).then((res : any) => {
                resolve(res);
            });

        });
    }

    async getLogs(@Param() email: string){

        const logs = [] ;
        await this.activityLogsCollection.where('user', '==', email).get().then(async (querySnapshot) =>{
            querySnapshot.docs.forEach((doc) => {
                logs.push(doc.data());
            });
        });
        return logs ;
    }

    //activity logs - DELETE

    //TODO: implement

    //REQUESTS

    //requests - CREATE
    async makeConnectionRequest(@Param() sender: string, @Param() receiver: string){

        const now = new Date() ;
        const data = {
            sender: sender,
            receiver: receiver,
            time: now
        }

        await this.buddyRequestsCollection.doc().set(data)
        .then(results =>{
            return true ;
        });
        return false ;
    }



    //requests - READ

    //incoming
    async getIncomingRequests(@Param() email: string) {
        const requests = [] ;
        await this.buddyRequestsCollection.where('receiver', '==', email).get().then(async (querySnapshot) =>{
            querySnapshot.docs.forEach((doc) => {
                requests.push(doc.data());
            });
        });
        return requests;

        //return this.fs.collection('BuddyRequests', ref => ref.where('receiver', '==', email)).valueChanges();

    }

    //outgoing
    async getOutgoingRequests(@Param() email: string){
        const requests = [] ;
        await this.buddyRequestsCollection.where('sender', '==', email).get().then(async (querySnapshot) =>{
            querySnapshot.docs.forEach((doc) => {
                requests.push(doc.data());
            });
        });
        return requests ;
    }

    //requests - DELETE
    async deleteConnectionRequest(@Param() receiver: string, @Param() sender: string){
        return this.buddyRequestsCollection.where('sender', '==', sender).where('receiver','==',receiver).get().then(async (result) => {
            if(result.docs[0]) return this.buddyRequestsCollection.doc(result.docs[0].id).delete().then(results => {
                console.log("deleted") ;
                return true ;
            }) ;
            console.log("delete problem") ;
            return false ;
        })
    }

    //CONNECTIONS

    //connections - CREATE
    async makeConnection(@Param() user1: string, @Param() user2: string){


        return this.usersCollection.where('email', '==', user1).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).update({buddies: this.arrayUnion(user2)}).then(results => {
                return this.usersCollection.where('email', '==', user2).get().then(async (result1) =>{
                    if(result1.docs[0]) return this.usersCollection.doc(result1.docs[0].id).update({buddies: this.arrayUnion(user1)}).then(results =>{
                        return true ;
                    })
                });
            }) ;
            return false ;
        })
    }

    //connections - READ
    async getConnections(@Param() email: string){
        const buddies = [] ;
        await this.buddyConnectionsCollection.where('users', 'array-contains', email).get().then(async (querySnapshot) =>{
            querySnapshot.docs.forEach((doc) => {
                buddies.push(doc.data());
            });
        });
        return buddies ;
    }

    //connections - UPDATE (metric)
    //TODO: implement

    //connections - DELETE
    async deleteConnection(@Param() user1: string, @Param() user2: string){
        return this.buddyConnectionsCollection.where('user1', '==', user1).where('user2','==',user2).get().then(async (result) => {
            if(result.docs[0]) return this.buddyConnectionsCollection.doc(result.docs[0].id).delete().then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    //SCHEDULED WORKOUTS

    //scheduled workouts - CREATE
    async scheduleWorkout(@Param() workout : ActivitySchedule){
        const data = {
            id: uuid.v1().toString(),
            title: workout.title,
            organiser: workout.email,
            participants: [{email: workout.email, complete: false}],
            startTime: workout.time,
            activityType: workout.activity,
            startPoint: workout.location,
            proposedDistance: workout.distance,
            proposedDuration: workout.duration,
        }

        await this.scheduledWorkoutCollection.doc().set(data)
        .then(results =>{
            return true ;
        });
        return false ;
    }

    async getScheduledWorkouts(@Param() email: string){
        const workouts = [] ;
        await this.scheduledWorkoutCollection.where('participants', 'array-contains', {'email': email, 'complete': false}).get().then(async (querySnapshot) =>{
            querySnapshot.docs.forEach((doc) => {
                if(doc.data().startTime >= Date.now()/1000)
                    workouts.push(doc.data());
            });
        });
        return workouts ;
    }

    async getWorkoutHistory(@Param() email: string){
        const workouts = [] ;
        await this.scheduledWorkoutCollection.where('participants', 'array-contains', {'email': email, 'complete': false}).get().then(async (querySnapshot) =>{
            querySnapshot.docs.forEach((doc) => {
                if(doc.data().startTime < Date.now()/1000){
                    const w = doc.data() ;
                    const c = [] ;
                    c.push(false) ;
                    w.complete = c;
                    workouts.push(w);
                }
            });
        });
        await this.scheduledWorkoutCollection.where('participants', 'array-contains', {'email': email, 'complete': true}).get().then(async (querySnapshot) =>{
            querySnapshot.docs.forEach((doc) => {
                if(doc.data().startTime < Date.now()/1000){
                    const w1 = doc.data() ;
                    const c1 = [] ;
                    c1.push(true) ;
                    w1.complete = c1;
                    workouts.push(w1);
                }
            });
        });
        return workouts ;
    }

    async getWorkout(@Param() email: string, @Param() workoutID: string):Promise<any>{
        return this.scheduledWorkoutCollection.where('id', '==', workoutID).get().then(async (result) =>{
            if(result.docs[0]){
                const data = result.docs[0].data() ;

                const users = [] ;
                const completeVals = [] ;
                data.participants.forEach((user) => {
                    users.push(this.login(user.email)) ;
                    completeVals.push(user.complete) ;
                })

                data.participants = users ;
                data.complete = completeVals ;
                return data ;
                //return result.docs[0].data() ;
            }
            return false ;
        });
    }
    //scheduled workouts - UPDATE
    //TODO: implement

    //workout invite - CREATE
    async createInvite(@Param() email: string, @Param() workout: string){

            const data = {
                sender: email,
                receivers: [],
                workout: workout
            }
            await this.workoutInvitesCollection.doc().set(data).then(results =>{
                return true ;
            });
            return false;
    }

    //workout invite - SEND
    async sendInvite(@Param() sender: string, @Param() receivers: string[], @Param() workout: string){
            return this.workoutInvitesCollection.where('sender', '==', sender).where('workout','==',workout).get().then(async (result) => {
                if(result.docs[0]){
                    console.log("hello")
                    for(let i = 0; i < receivers.length; i++){
                        this.workoutInvitesCollection.doc(result.docs[0].id).update({receivers: this.arrayUnion(receivers[i])}) ;
                    }
                    return true ;
                }
                return false ;
            })
    }

    //workout invite - ACCEPT
    async acceptInvite(@Param() user: string, @Param() sender: string, @Param() workout: string){
            return this.workoutInvitesCollection.where('sender', '==', sender).where('workout','==',workout).get().then(async (result) => {
                if(result.docs[0]) {
                    return this.workoutInvitesCollection.doc(result.docs[0].id).update({receivers: this.arrayRemove(user)}).then(results => {
                    return this.scheduledWorkoutCollection.where("id","==",workout).get().then(async (res) => {
                        return this.scheduledWorkoutCollection.doc(res.docs[0].id).update({participants: this.arrayUnion({'email': user, 'complete': false})}).then(result =>{
                            return true ;
                        }) ;
                    } );
                }) ;
                };
            });
            return false;
    }

    //workout invite - REJECT
    async rejectInvite(@Param() user: string, @Param() sender: string, @Param() workoutID: string){
        if(workoutID != null){
            return this.workoutInvitesCollection.where('sender', '==', sender).where('workout','==',workoutID).get().then(async (result) => {
                if(result.docs[0]) return this.workoutInvitesCollection.doc(result.docs[0].id).update({receivers: this.arrayRemove(user)}).then(results => {
                    return true;
                }) ;
                return false ;
            });
        }
    }

    async getIncomingInvites(@Param() user: string){
        const invites = [] ;
        await this.workoutInvitesCollection.where('receivers', 'array-contains', user).get().then(async (querySnapshot) =>{
            querySnapshot.docs.forEach((doc) => {

                // const recs = [] ;
                // doc.data().receivers.forEach((rec) => {
                //     recs.push(this.login(rec)) ;
                // })
                const data = {
                    sender: doc.data().sender,
                    receivers: doc.data().receivers,
                    workout: this.getWorkout(user, doc.data().workout)
                }
                invites.push(data);
            });
        });
        return invites ;
    }

    async getOutgoingInvites(@Param() user: string){
        const invites = [] ;
        await this.workoutInvitesCollection.where('sender', '==', user).get().then(async (querySnapshot) =>{
            querySnapshot.docs.forEach((doc) => {
                const data = {
                    sender: doc.data().sender,
                    receivers: doc.data().receivers,
                    workout: this.getWorkout(user, doc.data().workout)
                }
                invites.push(data);
            })
        });
        return invites ;
    }

    //complete a workout
    async completeWorkout(@Param() workoutID: string, @Param() email: string){
        //change status to complete
        if(workoutID != null){
            return this.scheduledWorkoutCollection.where("id", "==", workoutID).get().then(async (result) => {
                return this.scheduledWorkoutCollection.doc(result.docs[0].id).update({participants: this.arrayRemove({'email': email, 'complete': false})}).then(results => {
                    return this.scheduledWorkoutCollection.doc(result.docs[0].id).update({participants: this.arrayUnion({'email': email, 'complete': true})}) ;
                })
            });
        }

    }
}
