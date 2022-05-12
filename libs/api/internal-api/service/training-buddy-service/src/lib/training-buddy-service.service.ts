import { Injectable } from '@nestjs/common';
import {UserDto , UserEntity} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';
import { ApiInternalApiRepositoryDataAccessService } from '@training-buddy/api/internal-api/repository/data-access';
@Injectable()
export class TrainingBuddyServiceService {
    /**
     * 
     * @param jwtService 
     */
    constructor(private jwtService : JwtService, private repoService : ApiInternalApiRepositoryDataAccessService , private user : UserEntity){}
    /**
     * 
     * @param email 
     * @param password 
     * @returns null || UserEntity
     */
    async validateUser(email: string , password: string):Promise<any> {
        const user = await this.findOne(email);
        let valid = false;
        if(user)
            valid = await bcrypt.compare(password, user?.password)
        if(user && valid){ 
            const{password , ...result} = user;
            return result;
        }
        return null;
    }
    /**
     * 
     * @param email 
     * @returns Promise UserEntity
     */
    async findOne(email: string): Promise<any>{
        return await this.repoService.login(email)
    }
    async signup(userdto : UserDto){
        let user = await this.findOne(userdto.email);
        if(user){{
            throw new Error("User Exixts");
        }}
        else{
            const password = await bcrypt.hash(userdto.password, 10)
            user = {...userdto, password };
            this.repoService.createUser(user);
            return user;
        }
    }
    /**
     * 
     * @returns Array Of UserEntity
     */
    getAll(Location:string ){
        return this.repoService.findAll(Location)
    }
    /**
     * 
     * @param user 
     * @returns 
     */
    async login( user:any){
        const {...result}=user
        this.user.email = user.email
        this.user.cellNumber = user.contactNumber
        this.user.location = user.location
        this.user.gender=user.gender
        this.user.dob = user.dateOfBirth
        this.user.userName = user.firstName
        this.user.userSurname = user.lastName
        {
            return {
                accessToken: this.jwtService.sign({user: user.firstName , email: user.email}),
                user: this.user
            }
        }

    }
}
