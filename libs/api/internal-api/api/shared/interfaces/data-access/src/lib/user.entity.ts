import {ObjectType , Field } from '@nestjs/graphql'
import { Metric } from "./metric";

@ObjectType()
export class UserEntity {
    @Field({nullable:true})
    userName: string
    @Field({nullable:true})
    userSurname: string
    @Field({nullable:true})
    location:string
    @Field({nullable:true})
    longitude:number
    @Field({nullable:true})
    latitude:number
    @Field({nullable:true})
    stravaToken:string
    @Field({nullable:true})
    dob:string
    @Field({nullable:true})
    gender:string
    @Field({nullable:true})
    email: string
    @Field({nullable:true})
    cellNumber: string 
    @Field({nullable:true})
    bio: string 
    @Field(()=>Metric, {nullable:true})
    metrics: Metric
    @Field(type=> [String] , {nullable:true})
    buddies: string[] 

}
