import { Injectable, Param } from '@nestjs/common';
import { Field } from '@nestjs/graphql';
import { UserDto, ActivityStat, Userconfig, ActivityLog, ActivitySchedule } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import * as admin from 'firebase-admin'
import passport = require('passport');
import { emit } from 'process';
import internal = require('stream');

@Injectable()
export class ApiInternalApiRepositoryDataAccessService {
    
    firestore = new admin.firestore.Firestore() ;
    usersCollection = this.firestore.collection('/Users') ;
    activityLogsCollection = this.firestore.collection('/ActivityLogs') ;
    buddyConnectionsCollection = this.firestore.collection('/BuddyConnections') ;
    buddyRequestsCollection = this.firestore.collection('/BuddyRequests') ;
    scheduledWorkout = this.firestore.collection('/ScheduledWorkouts') ;


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
            if(result) return result.docs[0].data() ;
            return Promise.reject("No such document") ;
        });
    }

    async findAll(@Param() email: string){
        const users = [] ;
        await this.usersCollection.where('email', '!=', email).get().then(async (querySnapshot) =>{
            querySnapshot.docs.forEach((doc) => {
                users.push(doc.data());
            });
        });
        return users ;
    }


    //user - UPDATE

    async userConfig(@Param() userConfig: Userconfig){
        //implement
    }

    async updateCellNumber(@Param() cellNumber: string, @Param() email: string){
        await this.usersCollection.where('email', '==', email).get().then(async (result) => {
            this.usersCollection.doc(result.docs[0].id).update({cellNumber: cellNumber}) ;
        })
        
    }

    async updateEmail(@Param() email: string, @Param() oldEmail: string){
        await this.usersCollection.where('email', '==', oldEmail).get().then(async (result) => {
            this.usersCollection.doc(result.docs[0].id).update({email: email}) ;
        })
        
    }

    async updateLocation(@Param() location: string, @Param() email: string){
        await this.usersCollection.where('email', '==', email).get().then(async (result) => {
            this.usersCollection.doc(result.docs[0].id).update({location: location}) ;
        })
        
    }

    async updatePassword(@Param() password: string, @Param() email: string){
        await this.usersCollection.where('email', '==', email).get().then(async (result) => {
            this.usersCollection.doc(result.docs[0].id).update({password: password}) ;
        })
        
    }

    async updateUserName(@Param() userName: string, @Param() email: string){
        await this.usersCollection.where('email', '==', email).get().then(async (result) => {
            this.usersCollection.doc(result.docs[0].id).update({userName: userName}) ;
        })
        
    }

    async updateUserSurname(@Param() userSurname: string, @Param() email: string){
        await this.usersCollection.where('email', '==', email).get().then(async (result) => {
            this.usersCollection.doc(result.docs[0].id).update({userSurname: userSurname}) ;
        })
        
    }

    //user - DELETE
    
    //TODO: implement


    // //ACTIVITY LOGS

    // //activity logs - CREATE
    // async logActivity(@Param() log: ActivityLog){

    // }

    // //activity logs - DELETE
    
    // //TODO: implement

    // //REQUESTS

    // //requests - CREATE
    // async makeConnectionRequest(@Param() sender: string, @Param() reciever: string){

    // }

    // //requests - DELETE
    // async deleteConnectionRequest(@Param() sender: string, @Param() reciever: string){

    // }

    // //CONNECTIONS

    // //connections - CREATE
    // async makeConnection(@Param() user1: string, @Param() user2: string){

    // }

    // //connections - UPDATE
    // async updateConnectionMetric(@Param() user1: string, @Param() user2: string, @Param() metric: number){

    // }

    // //connections - DELETE 
    // async deleteConnection(@Param() user1: string, @Param() user2: string){

    // }

    // //SCHEDULED WORKOUTS

    // //scheduled workouts - CREATE
    // async scheduleWorkout(@Param() workout : ActivitySchedule){

    // }

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
