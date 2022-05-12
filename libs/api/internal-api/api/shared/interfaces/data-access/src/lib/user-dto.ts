import { Field , Int, InputType} from '@nestjs/graphql'
@InputType()
export class UserDto {
    @Field()
    userName: string
    @Field()
    userSurname: string
    @Field()
    location:string
    @Field()
    gender:string
    @Field()
    dob:string
    @Field()
    email: string
    @Field()
    cellNumber: string
    @Field()
    password: string
}
