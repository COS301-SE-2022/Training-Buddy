import { Field , Int, InputType} from '@nestjs/graphql'

@InputType()
export class ActivitySchedule {
    @Field() 
    id: number
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
    duration:number
}