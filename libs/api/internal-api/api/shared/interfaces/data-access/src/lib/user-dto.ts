import { Field , Int, InputType} from '@nestjs/graphql'
@InputType()
export class UserDto {
    @Field()
    userName: string
    @Field()
    userSurname: string
    @Field()
    location:string
    @Field({nullable:true})
    longitude:number
    @Field({nullable:true})
    latitude:number
    @Field({nullable:true})
    stravaToken:string
    @Field()
    gender:string
    @Field()
    distance:number
    @Field()
    dob:string
    @Field()
    email: string
    @Field()
    cellNumber: string
    @Field()
    password: string
}
