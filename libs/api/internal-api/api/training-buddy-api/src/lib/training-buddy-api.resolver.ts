import { Mutation, Resolver, Args, Query, Context } from '@nestjs/graphql';
import { TrainingBuddyServiceService , LoginGuard, JwtAuthGuard } from '@training-buddy/api/internal-api/service/training-buddy-service'
import {UserDto , UserEntity , LoginResponse, LoginInput} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
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
    @Mutation(()=> UserEntity)
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
     * @returns Array of Users
     */
    @Query(() => [UserEntity] )
    @UseGuards(JwtAuthGuard)
    findAll(){
        return this.trainingBuddyService.findAll();
    }


}
