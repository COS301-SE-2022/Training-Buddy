import { Injectable, Param } from '@nestjs/common';
import { Field } from '@nestjs/graphql';
import { UserDto, ActivityStat, Userconfig, ActivityLog, ActivitySchedule } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import * as admin from 'firebase-admin'
import passport = require('passport');
import { emit, send } from 'process';
import { async } from 'rxjs';
import internal = require('stream');

@Injectable()
export class ApiInternalApiRepositoryDataAccessService {
    
    firestore = new admin.firestore.Firestore() ;
    usersCollection = this.firestore.collection('/Users') ;
    activityLogsCollection = this.firestore.collection('/ActivityLogs') ;
    buddyConnectionsCollection = this.firestore.collection('/BuddyConnections') ;
    buddyRequestsCollection = this.firestore.collection('/BuddyRequests') ;
    scheduledWorkoutCollection = this.firestore.collection('/ScheduledWorkouts') ;


    //USERS
    //users - CREATE
    async createUser(@Param() user: UserDto){
        const data = {
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
            stravaToken : user.stravaToken
        }

        await this.usersCollection.doc().set(data)
        .then(results =>{
            return true ;
        });
        return false ;
    }

    //users - READ

    async login(@Param() email: string):Promise<any>{
        return this.usersCollection.where('email', '==', email).get().then(async (result) =>{
            if(result.docs[0]) return result.docs[0].data() ;
            return false ;
        });
    }

    async findAll(@Param() email: string){
        const users = [] ;
        await this.usersCollection.get().then(async (querySnapshot) =>{
            querySnapshot.docs.forEach((doc) => {
                users.push(doc.data());
            });
        });
        return users ;
    }


    //user - UPDATE

    async userConfig(@Param() userConfig: Userconfig){
        
        let run = 0 ;
        let ride = 0; 
        let swim = 0; 
        let lift = 0 ;

        if(userConfig.riding)
            ride = 1 ;
        if(userConfig.running)
            run = 1 ;
        if(userConfig.swimming)
            swim = 1 ;
        if(userConfig.weightLifting)
            lift = 1 ;
        
        const data = {
            metrics: {
                run : run,
                ride : ride, 
                swim : swim,
                lift : lift
            },
            distance : userConfig.distance,
            bio : userConfig.bio 
        }

        return this.usersCollection.where('email', '==', userConfig.email).get().then(async (result) => {
            if(result.docs[0]) return this.usersCollection.doc(result.docs[0].id).set(data, {merge: true}).then(results => {
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

    //user - DELETE
    
    //TODO: implement


    //ACTIVITY LOGS

    //activity logs - CREATE
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

    //activity logs - READ
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
    async getIncomingRequests(@Param() email: string){
        const requests = [] ;
        await this.buddyRequestsCollection.where('receiver', '==', email).get().then(async (querySnapshot) =>{
            querySnapshot.docs.forEach((doc) => {
                requests.push(doc.data());
            });
        });
        return requests ;
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
    async deleteConnectionRequest(@Param() sender: string, @Param() receiver: string){
        return this.buddyRequestsCollection.where('sender', '==', sender).where('receiver','==',receiver).get().then(async (result) => {
            if(result.docs[0]) return this.buddyRequestsCollection.doc(result.docs[0].id).delete().then(results => {
                return true ;
            }) ;
            return false ;
        })
    }

    //CONNECTIONS

    //connections - CREATE
    async makeConnection(@Param() user1: string, @Param() user2: string){
        const now = new Date() ;
        const data = {
            users: {
                user1: user1,
                user2: user2
            },
            time: now,
            metric: 0
        }

        await this.buddyConnectionsCollection.doc().set(data)
        .then(results =>{
            return true ;
        });
        return false ;
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
            organiser: workout.email,
            startTime: workout.time,
            activityType: workout.activity,
            startPoint: workout.location,
            proposedDistance: workout.distance,
            proposedDuration: workout.duration
        }

        await this.scheduledWorkoutCollection.doc().set(data)
        .then(results =>{
            return true ;
        });
        return false ;
    }

    //scheduled workouts - UPDATE
    //TODO: implement


    //REDUNDANT
    async createActivityStatistic(@Param() activity: ActivityStat){
        //Update to activity logs
        return false;
    }

    async getAllActivityStatistics(@Param() email: string){
        //redundant
    }



}
