
import {ObjectType , Field } from '@nestjs/graphql'


@ObjectType()
export class ErrorMessage {
    @Field()
    message: string
}
