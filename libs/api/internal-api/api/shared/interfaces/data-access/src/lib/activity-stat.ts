
import {InputType , Field } from '@nestjs/graphql'


@InputType()
export class ActivityStat {
    @Field()
    email: string;
    @Field()
    activity:string
    @Field()
    insight:string
    @Field()
    XP : string;
}
