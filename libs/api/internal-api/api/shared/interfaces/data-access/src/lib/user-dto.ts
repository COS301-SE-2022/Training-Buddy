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
    email: string
    @Field(()=>Int)
    cellNumber: number 
    @Field()
    password: string
}
