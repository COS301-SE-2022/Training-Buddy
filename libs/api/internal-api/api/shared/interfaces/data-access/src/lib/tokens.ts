

import { ObjectType , Field} from "@nestjs/graphql";
@ObjectType()
export class Tokens {
    @Field()
    stravaAccess:string 
    @Field()
    stravaRefresh:string
}
