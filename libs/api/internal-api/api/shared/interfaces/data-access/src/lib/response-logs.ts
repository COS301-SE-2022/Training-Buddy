import { ObjectType , Field} from "@nestjs/graphql";
@ObjectType()
export class ResponseLogs {
    @Field()
    email: string
    @Field()
    activityType:string
    @Field()
    dateCompleted:string
    @Field()
    distance:number
    @Field() 
    name: string 
    @Field()
    speed:number
    @Field()
    time:number
}
