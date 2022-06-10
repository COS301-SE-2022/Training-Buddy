import { Mutation, Resolver, Args, Query, Context } from '@nestjs/graphql';
import { TrainingBuddyServiceService , LoginGuard, JwtAuthGuard } from '@training-buddy/api/internal-api/service/training-buddy-service'
import {UserDto , UserEntity,ResponseWorkout,ResponseLogs , LoginResponse, LoginInput,ActivityLog, ActivitySchedule, ErrorMessage, ActivityStat, UpdateUser, UserStatRes, Userconfig} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class TrainingBuddyApiResolver {
    /**
     * 
     * @param trainingBuddyService 
     */
    constructor (private readonly trainingBuddyService : TrainingBuddyServiceService ){
    }
    /**
     * 
     * @param userDTO 
     * @returns UserEntity
     * tested
     */
    @Mutation(()=>ErrorMessage)
    signup(@Args('userDto')userDTO : UserDto){
        return this.trainingBuddyService.signup(userDTO);
    }
    /**
     * 
     * @param loginInput 
     * @param context 
     * @returns LoginResponse
     * tested
     */
    @Mutation(()=>LoginResponse)
    @UseGuards(LoginGuard)
    login(@Args('loginInput')loginInput:LoginInput, @Context() context){
        return this.trainingBuddyService.login(context.user);
    }
    /**
     * 
     * @param Location 
     * @returns Array of UserEntity
     * tested
     */
    @Query(() => [UserEntity])
    //@UseGuards(JwtAuthGuard)
    findAll(@Args('email')email:string){
        return this.trainingBuddyService.getAll(email);
    }
    /**
     * 
     * @param activityStat 
     * @returns ErrorMessage
     */
    @Mutation(()=>ErrorMessage)
    //@UseGuards(JwtAuthGuard)
    activityStat(@Args('activityStat')activityStat: ActivityStat){
        return this.trainingBuddyService.createActivityStat(activityStat)
    }
    @Query(()=>UserEntity)
    getOne(@Args("email")email:string){
        return this.trainingBuddyService.findOne(email);
    }
    /**
     * 
     * @param email 
     * @returns userStatRes
     */
    @Query(()=>[UserStatRes])
    //@UseGuards(JwtAuthGuard)
    fetchUserStats(@Args('email')email:string){
        return this.trainingBuddyService.fetchUserStat(email);
    }
    /**
     * 
     * @param update 
     * @returns ErrorMessage
     */
    @Mutation(()=>ErrorMessage)
    //@UseGuards(JwtAuthGuard)
    updateProfile(@Args('updates')update: UpdateUser){
        return this.trainingBuddyService.updateUser(update)
    }
    /**
     * 
     * @param userconfig
     * @returns ErrorMessage
     * tested
     *  */ 
    @Mutation(()=>ErrorMessage)
    userConfig(@Args('userConfig')userconfig: Userconfig){
        return this.trainingBuddyService.userConfig(userconfig)
    }
    /**
     * 
     * @param activityLog 
     * @returns ErrorMessage
     * tested  
     */
    @Mutation(()=> ErrorMessage)
    activityLog(@Args('Activitylog')activityLog: ActivityLog){
        return this.trainingBuddyService.activityLog(activityLog)
    }
    /**
     * 
     * @param activitySchedule 
     * @returns ErrorMessage
     * tested
     */
    @Mutation(()=> ErrorMessage)
    activitySchedule(@Args('ActivitySchedule')activitySchedule: ActivitySchedule){
        return this.trainingBuddyService.activitySchedule(activitySchedule)
    }
    /**
     * 
     * @param userEmail 
     * @param otherEmail 
     * @returns ErrorMessage
     * tested 
     */
    @Mutation(()=>ErrorMessage)
    sendRequest(@Args('Sender')userEmail: string , @Args('Receiver')otherEmail: string){
        return this.trainingBuddyService.sendRequest(userEmail, otherEmail);
    }
    /**
     * 
     * @param userEmail 
     * @param otherEmail 
     * @returns ErrorMessage
     * tested
     */
    @Mutation(()=>ErrorMessage)
    reject(@Args('Sender')userEmail: string ,  @Args('Receiver')otherEmail: string){
        return this.trainingBuddyService.reject(userEmail, otherEmail);
    }
    /**
     * 
     * @param userEmail 
     * @param otherEmail 
     * @returns ErrorMessage
     * tested
     */
    @Mutation(()=>ErrorMessage)
    accept(@Args('Sender')userEmail: string ,  @Args('Receiver')otherEmail: string){
        return this.trainingBuddyService.accept(userEmail, otherEmail);
    }
    /**
     * 
     * @param userEmail 
     * @returns 
     * tested
     */
    @Query(()=>[UserEntity])
    getIncoming(@Args("email")userEmail:string){
        return this.trainingBuddyService.getIncoming(userEmail);
    }
    /**
     * 
     * @param userEmail 
     * @returns [userEntities]
     * tested
     */
    @Query(()=>[UserEntity])
    getOutgoing(@Args("email")userEmail:string){
        return this.trainingBuddyService.getOutgoing(userEmail);
    }
    /**
     * 
     * @param userEmail 
     * @returns  [userEntities]
     * tested
     */
    @Query(()=>[UserEntity])
    getConnections(@Args("email")userEmail:string){
        return this.trainingBuddyService.getConnections(userEmail);
    }
    /**
     * 
     * @param userEmail 
     * @returns
     * tested 
     */
    @Query(()=>[ResponseWorkout])
    getScheduleWorkout(@Args("email")userEmail:string){
        return this.trainingBuddyService.getScheduleWorkout(userEmail);
    }
    /**
     * 
     * @param userEmail 
     * @returns 
     * tested
     */
    @Query(()=>[ResponseLogs])
    getLogs(@Args("email")userEmail:string){
        return this.trainingBuddyService.getLogs(userEmail);
    }
 


}


