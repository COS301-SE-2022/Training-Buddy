import { Field , Int, InputType} from '@nestjs/graphql'

@InputType()
export class ActivitySchedule {
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
