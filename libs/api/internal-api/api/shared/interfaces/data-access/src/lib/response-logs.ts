import { ObjectType , Field} from "@nestjs/graphql";
@ObjectType()
export class ResponseLogs {
    @Field()
    user: string
    @Field()
    activityType:string
    @Field()
    dateComplete:string
    @Field()
    distance:number
    @Field() 
    name: string 
    @Field()
    speed:number
    @Field()
    time:number
}
