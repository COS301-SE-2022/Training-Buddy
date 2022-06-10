import { ObjectType , Field} from "@nestjs/graphql";
import { UserEntity } from "./user.entity";
@ObjectType()
export class Metric {
    @Field()
    lift:number
    @Field()
    ride:number
    @Field()
    run:number
    @Field()
    swim
}
import { ObjectType , Field} from "@nestjs/graphql";
import { UserEntity } from "./user.entity";

@ObjectType()
export class LoginResponse {
    @Field({nullable:true})
    accessToken: string;
    @Field(()=>UserEntity)
    user: UserEntity
}
