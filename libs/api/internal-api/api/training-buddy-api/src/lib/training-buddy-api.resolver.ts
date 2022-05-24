import { Mutation, Resolver, Args, Query, Context } from '@nestjs/graphql';
import { TrainingBuddyServiceService , LoginGuard, JwtAuthGuard } from '@training-buddy/api/internal-api/service/training-buddy-service'
import {UserDto , UserEntity , LoginResponse, LoginInput, ErrorMessage, ActivityStat, UpdateUser, UserStatRes, Userconfig} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
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
     */
    @Mutation(()=> UserEntity||ErrorMessage)
    signup(@Args('userDto')userDTO : UserDto){
        return this.trainingBuddyService.signup(userDTO);
    }
    /**
     * 
     * @param loginInput 
     * @param context 
     * @returns LoginResponse
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
     */
    @Query(() => [UserEntity])
    //@UseGuards(JwtAuthGuard)
    findAll(@Args('location')Location:string){
        return this.trainingBuddyService.getAll(Location);
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
     *  */ 
    @Mutation(()=>ErrorMessage)
    userConfig(@Args('userConfig')userconfig: Userconfig){
        return this.trainingBuddyService.userConfig(userconfig)
    }


}

