

import { Field , InputType} from '@nestjs/graphql'
@InputType()
export class Userconfig {
    @Field()
    email:string
    @Field()
    running: number
    @Field()
    riding: number
    @Field()
    swimming: number
    @Field()
    weightLifting: number
    @Field()
    distance:number
    @Field()
    bio: string

}
