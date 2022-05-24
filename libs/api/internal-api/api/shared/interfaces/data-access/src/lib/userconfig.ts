

import { Field , InputType} from '@nestjs/graphql'
@InputType()
export class Userconfig {
    @Field()
    runnuing: boolean
    @Field()
    riding: boolean
    @Field()
    swimming: boolean
    @Field()
    weightLifting: boolean
    @Field()
    bio: string

}
