import {ObjectType , Field } from '@nestjs/graphql'


@ObjectType()
export class UserEntity {
    @Field({nullable:true})
    userName: string
    @Field({nullable:true})
    userSurname: string
    @Field({nullable:true})
    location:string
    @Field({nullable:true})
    dob:string
    @Field({nullable:true})
    gender:string
    @Field({nullable:true})
    email: string
    @Field({nullable:true})
    cellNumber: string 
}
