import { ObjectType , Field} from "@nestjs/graphql";


@ObjectType()
export class ResponseWorkout {
    @Field()
    time:string
    @Field()
    activity:string
    @Field()
    location:string
    @Field()
    distance:string
    @Field()
    duration:number
}
