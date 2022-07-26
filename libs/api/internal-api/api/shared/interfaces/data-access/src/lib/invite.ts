import { ResponseWorkout } from './response-workout'
import {ObjectType , Field } from '@nestjs/graphql'

@ObjectType()
export class Invite {
    @Field()
    sender:string

    @Field(type=> [String] , {nullable:true})
    receivers: string[]

    @Field()
    workout:ResponseWorkout
}
