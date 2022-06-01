import { Injectable, Param } from '@nestjs/common';
import { Field } from '@nestjs/graphql';
import { UserDto, ActivityStat, Userconfig } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
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
        //implement
    }

    //Log in
    async login(@Param() email: string){
        return this.usersCollection.where('email', '==', email).get();
    }

    //Find one user
    async findOne(@Param() email: string){
        return this.usersCollection.where('email', '==', email).get();
    }

    //Get All Users
    async findAll(){
        return this.usersCollection.get() ;
    }

    //Get All Users within a range
    //Pass in email and locationRange
    //Return users within that range

    //REDUNDANT
    async createActivityStatistic(@Param() activity: ActivityStat){
        //Update to activity logs
        return false;
    }

    async getAllActivityStatistics(@Param() email: string){
        //redundant
    }



}
