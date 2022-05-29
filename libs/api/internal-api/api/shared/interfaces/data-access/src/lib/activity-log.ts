
import { Field , Int, InputType} from '@nestjs/graphql'


@InputType()
export class ActivityLog {
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
