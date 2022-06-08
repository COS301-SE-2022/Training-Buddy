import { ObjectType , Field} from "@nestjs/graphql";


@ObjectType()
export class ResponseWorkout {
    @Field()
    startTime:string
    @Field()
    organiser:string
    @Field(type=> [String] , {nullable:true})
    participants:string[]
    @Field()
    activityType:string
    @Field()
    startPoint:string
    @Field()
    proposedDistance:string
    @Field()
    proposedDuration:number
}
