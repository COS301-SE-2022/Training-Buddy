import { ObjectType , Field} from "@nestjs/graphql";
import { UserEntity } from "./user.entity";


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
    @Field(type=> [UserEntity] , {nullable:true})
    participants:UserEntity[]
    @Field()
    activityType:string
    @Field()
    startPoint:string
    @Field()
    proposedDistance:string
    @Field()
    proposedDuration:string
}
