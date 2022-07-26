import { ObjectType , Field} from "@nestjs/graphql";


@ObjectType()
export class ResponseWorkout {
    @Field()
    title:string
    @Field()
    id: string
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
    proposedDuration:string
}
