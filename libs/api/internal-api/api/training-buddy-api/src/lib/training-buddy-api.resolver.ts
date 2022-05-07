import { Mutation, Resolver, Args, Query } from '@nestjs/graphql';
import { TrainingBuddyServiceService } from '@training-buddy/api/internal-api/service/training-buddy-service'
import {UserDto , UserEntity} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
@Resolver()
export class TrainingBuddyApiResolver {
    constructor (private readonly trainingBuddyService : TrainingBuddyServiceService ){}
    @Mutation(()=> UserEntity)
    createUser(@Args('userDto')userDTO : UserDto){
        return this.trainingBuddyService.create(userDTO);
    }
    @Query(() => [UserEntity] )
    findAll(){
        return this.trainingBuddyService.findAll();
    }


}
