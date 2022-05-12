

import {ObjectType , Field } from '@nestjs/graphql'


@ObjectType()
export class UserStatRes {
    @Field()
    email: string;
    @Field()
    activity:string
    @Field()
    insight:string
    @Field()
    XP : string;
}
