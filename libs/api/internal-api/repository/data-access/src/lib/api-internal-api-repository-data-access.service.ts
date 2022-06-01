import { Injectable, Param } from '@nestjs/common';
import { Field } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime';
import { UserDto, ActivityStat, Userconfig, ActivityLog, ActivitySchedule } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import * as admin from 'firebase-admin'
import { use } from 'passport';
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

    //Sign Up
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
            locationRange : user.location,
            password : user.password,
            stravaToken : user.stravaToken
        }

        await this.usersCollection.doc().set(data)
        .then(results =>{
            return true ;
        });
        return false ;
    }

    //Configure User
    async userConfig(@Param() userConfig: Userconfig){
        let runM = 0 ;
        let swimM = 0 ;
        let rideM = 0 ;
        let weightLiftM = 0 ;

        if(userConfig.running == true){
            runM = 1 ;
        }
        if(userConfig.riding == true){
            rideM = 1 ;
        }
        if(userConfig.swimming == true){
            swimM = 1 ;
        }
        if(userConfig.weightLifting == true){
            weightLiftM = 1 ;
        }

        const data = {
            bio: userConfig.bio,
            mentrics: {
                run: runM ,
                ride : rideM,
                swim : swimM,
                weightLift : weightLiftM
            },
            locationRange : userConfig.distance //is this right?
        }

        let user = this.usersCollection.where('email','==', userConfig.email).get()[0] ;
        await this.usersCollection.doc(user).set(data, {merge: true})
        .then(results =>{
            return true ;
        });
        return false ;
    }

    //Log in
    async login(@Param() email: string){
        return this.usersCollection.where('email', '==', email).get();
    }

    //Find all users except current
    async findAll(@Param() email:string){
        return this.usersCollection.where('email', '!=', email).get() ;
    }

    //activity logs
    async logActivity(@Param() actLog: ActivityLog){
        const data = {
            activityType : actLog.activityType,
            dateComplete : actLog.dateCompleted,
            distance : actLog.distance,
            title : actLog.name,
            speed : actLog.speed,
            time : actLog.time,
            user : actLog.email
        }

        await this.activityLogsCollection.doc().set(data)
        .then(results =>{
            return true ;
        });
        return false ;
    }

    async getUserLogs(@Param() email:string){
        return this.activityLogsCollection.where('user', '==', email).get() ;
    }

    //activitySchedules

    async scheduleActivity(@Param() actSchedule: ActivitySchedule){
        const data = {
            activityType : actSchedule.activity,
            organiser : actSchedule.email,
            distance : actSchedule.distance,
            duration : actSchedule.duration,
            location : actSchedule.location,
            startTime : actSchedule.time,
            participants : {}
        }

        await this.scheduledWorkout.doc().set(data)
        .then(results =>{
            return true ;
        });
        return false ;
    }

    async getUsersScheduledActivities(@Param() email: string){
        let organised = this.scheduledWorkout.where('organiser', '==', email) ;
        let participating = this.scheduledWorkout.where('participants', 'array-contains', email) ;
    }

    //invite user to scheduled activity

    //buddy connections
    
    //create request

    //updateRequest

    //REDUNDANT
    async createActivityStatistic(@Param() activity: ActivityStat){
        //Update to activity logs
        return false;
    }

    async getAllActivityStatistics(@Param() email: string){
        //redundant
    }
}
