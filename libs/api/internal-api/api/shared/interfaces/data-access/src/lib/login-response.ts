import { ObjectType , Field} from "@nestjs/graphql";
import { UserEntity } from "./user.entity";

@ObjectType()
export class LoginResponse {
    @Field()
    accessToken: string;
    @Field(()=>UserEntity)
    user: UserEntity
}
