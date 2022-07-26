import { Field , Int, InputType} from '@nestjs/graphql'

@InputType()
export class ActivitySchedule {
    @Field()
    title:string
    @Field()
    id:string
    @Field()
    email: string
    @Field()
    time:string
    @Field()
    activity:string
    @Field()
    location:string
    @Field()
    distance:string
    @Field()
    duration:string
}