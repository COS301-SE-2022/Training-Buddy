import { Mutation, Resolver,Subscription, Args, Query, Context } from '@nestjs/graphql';
import { TrainingBuddyServiceService , LoginGuard, JwtAuthGuard } from '@training-buddy/api/internal-api/service/training-buddy-service'
import {UserDto ,Invite , UserEntity,ResponseWorkout,ResponseLogs , LoginResponse, Tokens , LoginInput,ActivityLog, ActivitySchedule, ErrorMessage, ActivityStat, UpdateUser, UserStatRes, Userconfig} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions'
const pubsub = new PubSub();
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
   
    @Mutation(()=>ErrorMessage)
    sendRequest(@Args('Sender')userEmail: string , @Args('Receiver')otherEmail: string){
        const val = this.trainingBuddyService.sendRequest(userEmail, otherEmail);
        this.subscriptionsRequest(userEmail, otherEmail)
        return val
    }
    /**
     * 
     * @returns [userEntity]
     */
    @Subscription(()=>[UserEntity])
    getIncomingSub(){
        const val = pubsub.asyncIterator( "getIncomingSub")
        return val;
    }
    /**
     * 
     * @returns [userEntity]
     */
    @Subscription(()=>[UserEntity])
    getOutgoingSub(){
        const val = pubsub.asyncIterator("getOutgoingSub")
        return val;
    }
    /**
     * 
     * @returns [UserEntity]
     */
    @Subscription(()=>[UserEntity])

    getConnectionsSub(){
        const val = pubsub.asyncIterator("getConnectionsSub")
        return val;
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
        const val = this.trainingBuddyService.reject(userEmail, otherEmail);
        this.subscriptionsRequest(userEmail, otherEmail)
        return val;
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
        const val = this.trainingBuddyService.accept(userEmail, otherEmail);
        this.subscriptionsRequest(userEmail, otherEmail)
        return val;
    }
    /**
     * 
     * @param userEmail 
     * @returns 
     * tested
     */
    @Query(()=>[UserEntity])
    getIncoming(@Args("email")userEmail:string){
        return  this.trainingBuddyService.getIncoming(userEmail);
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
    /**
     * 
     * @param userEmail 
     * @param accessToken 
     * @param refreshToken 
     * @returns 
     */

    @Mutation(()=>ErrorMessage)
    saveTokens(@Args("email")userEmail :string ,@Args("access")accessToken : string , @Args("refresh")refreshToken:string ){
        return this.trainingBuddyService.saveTokens(userEmail , accessToken , refreshToken);
    }
    /**
     * 
     * @param userEmail 
     * @returns 
     */
    @Query(()=>Tokens)
    getTokens(@Args("email")userEmail:string){
        return this.trainingBuddyService.getToken(userEmail);
    }
    /**
     * 
     * @param userEmail 
     * @param receiver 
     * @param startTime 
     * @returns ErrorMessage
     */
    @Mutation(()=>ErrorMessage)
    sendInvite(@Args("email")userEmail:string ,@Args("receiver")receiver:string ,@Args("workoutID")workoutID:string){
        const val = this.trainingBuddyService.sendInvite(userEmail,receiver, workoutID);
        this.subscriptionInvites(userEmail,receiver, workoutID)
        return val;
    }
   /**
    * @return UserEntity
    */
    @Query(()=>UserEntity)
    getUser(@Args("UserID")userID:string){
        return this.trainingBuddyService.getUser(userID);
    }
    /**
     * 
     * @param userEmail 
     * @param startTime 
     * @returns ErrorMessage
     */
    @Mutation(()=>ErrorMessage)
    createInvite(@Args("email")userEmail:string ,@Args("workoutID")workoutID:string){
        return this.trainingBuddyService.createInvite(userEmail, workoutID);
    }
    /**
     * 
     * @param userEmail 
     * @param sender 
     * @param startTime 
     * @returns ErrorMessage
     */
    @Mutation(()=>ErrorMessage)
    acceptInvite(@Args("email")userEmail:string ,@Args("sender")sender:string, @Args("workoutID")workoutID:string){
        const val = this.trainingBuddyService.acceptInvite(userEmail,sender, workoutID);
        this.subscriptionInvites(userEmail,sender, workoutID)
        return val;
    }
    /**
     * 
     * @param userEmail 
     * @param sender 
     * @param startTime 
     * @returns ErrorMessage
     */
    @Mutation(()=>ErrorMessage)
    rejectInvite(@Args("email")userEmail:string ,@Args("sender")sender:string, @Args("workoutID")workoutID:string){
        const val = this.trainingBuddyService.rejectInvite(userEmail,sender, workoutID);
        this.subscriptionInvites(userEmail,sender, workoutID)
        return val;
    }
    /**
     * 
     * @param userEmail 
     * @returns [Invite]
     */
    @Query(()=> [Invite])
    getIncomingInvites(@Args("email")userEmail:string){
        return this.trainingBuddyService.getIncomingInvites(userEmail)
    }
    /**
     * 
     * @param userEmail 
     * @returns [Invite]
     */
    @Query(()=> [Invite])
    getOutgoingInvites(@Args("email")userEmail:string){
        return this.trainingBuddyService.getOutgoingInvites(userEmail)
    }
    /**
     * 
     * @param userEmail 
     * @param startTime 
     * @returns ResponseWorkout
     */
    @Query(()=>ResponseWorkout)
    getWorkout(@Args("email")userEmail:string ,@Args("workoutID")workoutID:string){
        return this.trainingBuddyService.getWorkout(userEmail, workoutID);
    }
    @Mutation(()=> ErrorMessage)
    saveImage(@Args("email")userEmail:string ,@Args("Image")image:string){
        return this.trainingBuddyService.saveImage(userEmail, image);
    }
     /**
     * 
     * @param userEmail 
     * @param otherEmail 
     * @returns ErrorMessage
     * tested 
     */
    subscriptionsRequest(userEmail: string, otherEmail: string){
        const data1 =this.trainingBuddyService.getIncoming(otherEmail);
        const data2 =this.trainingBuddyService.getOutgoing(userEmail);
        const data3 =this.trainingBuddyService.getConnections(userEmail);
        const data4 =this.trainingBuddyService.getConnections(otherEmail);
      
        pubsub.publish( "getIncomingSub",{[ "getIncomingSub"]:data1})
        pubsub.publish( "getOutgoingSub",{[ "getOutgoingSub"]:data2})
        pubsub.publish( "getConnectionsSub",{[ "getConnectionsSub"]:data3})
        pubsub.publish( "getConnectionsSub",{[ "getConnectionsSub"]:data4})
    }
    /**
     * 
     * @param userEmail 
     * @param otherEmail 
     * @param startTime 
     */
    subscriptionInvites(userEmail:string , otherEmail:string, startTime: string){
        const data1 =this.trainingBuddyService.getIncomingInvites(otherEmail);
        const data2 =this.trainingBuddyService.getOutgoingInvites(userEmail);
        const data3 =this.trainingBuddyService.getWorkout(userEmail, startTime);
        pubsub.publish( "getIncomingInviteSub",{[ "getIncomingInviteSub"]:data1})
        pubsub.publish( "getOutgoingInviteSub",{[ "getOutgoingInviteSub"]:data2})
        pubsub.publish( "getWorkoutSub",{[ "getWorkoutSub"]:data3})
       


    }
    @Subscription(()=>[Invite])
    getIncomingInviteSub(){
        const val = pubsub.asyncIterator("getIncomingInviteSub")
        return val;
    }

    @Subscription(()=>[Invite])
    getOutgoingInviteSub(){
        const val = pubsub.asyncIterator("getOutgoingInviteSub")
        return val;
    }
    @Subscription(()=>[ResponseWorkout])
    getWorkoutSub(){
        const val = pubsub.asyncIterator("getWorkoutSub")
        return val;
    }



    

}


