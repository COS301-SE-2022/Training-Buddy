import { ResponseWorkout } from './response-workout'
import {ObjectType , Field } from '@nestjs/graphql'
import { UserEntity } from './user.entity'

@ObjectType()
export class Invite {
    @Field()
    sender:string

    @Field(type=> [String] , {nullable:true})
    receivers: string[]

    @Field()
    workout:ResponseWorkout
}
