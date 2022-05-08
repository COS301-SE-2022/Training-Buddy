import { ObjectType , Field} from "@nestjs/graphql";
import {UserEntity} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';

@ObjectType()
export class LoginResponse {
    @Field()
    accessToken: string;
    @Field(()=>UserEntity)
    user: UserEntity
}
