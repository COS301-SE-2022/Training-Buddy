import { ObjectType , Field} from "@nestjs/graphql";

@ObjectType()
export class Metric {
    @Field()
    lift:number
    @Field()
    ride:number
    @Field()
    run:number
    @Field()
    swim:number
}

