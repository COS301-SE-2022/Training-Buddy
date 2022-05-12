import {ObjectType , Field , Int} from '@nestjs/graphql'


@ObjectType()
export class UserEntity {
    @Field()
    userName: string
    @Field()
    userSurname: string
    @Field()
    location:string
    @Field()
    dob:string
    @Field()
    gender:string
    @Field()
    email: string
    @Field()
    cellNumber: string 
}
