
import { Field , InputType} from '@nestjs/graphql'

@InputType()
export class UpdateUser {
    @Field({nullable:true})
    userName: string
    @Field({nullable:true})
    userSurname: string
    @Field({nullable:true})
    location:string
    @Field({nullable:true})
    email: string
    @Field()
    oldemail: string
    @Field({nullable:true})
    cellNumber: string
    @Field({nullable:true})
    password: string
    @Field ({nullable:true})
    distance: number
    
}
