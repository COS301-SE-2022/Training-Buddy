

import { Field , InputType} from '@nestjs/graphql'
@InputType()
export class Userconfig {
    @Field()
    email:string
    @Field()
    running: boolean
    @Field()
    riding: boolean
    @Field()
    swimming: boolean
    @Field()
    weightLifting: boolean
    @Field()
    distance:number
    @Field()
    bio: string

}
