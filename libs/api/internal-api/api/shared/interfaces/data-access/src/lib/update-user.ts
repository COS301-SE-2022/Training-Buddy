
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
    @Field ({nullable:true})
    longitude: number
    @Field ({nullable:true})
    latitude: number
    @Field({nullable:true})
    running: boolean
    @Field({nullable:true})
    riding: boolean
    @Field({nullable:true})
    swimming: boolean
    @Field({nullable:true})
    weightLifting: boolean
    @Field({nullable:true})
    bio: string
    
}
