import { Injectable} from '@nestjs/common';
import {UserDto , UserEntity,  ErrorMessage} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
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
            const item = new ErrorMessage;
            item.message = "User Already Exists";
            return item;
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
        const userr = new UserEntity;
        userr.email = user.email
        userr.cellNumber = user.contactNumber
        userr.location = user.location
        userr.gender=user.gender
        userr.dob = user.dateOfBirth
        userr.userName = user.firstName
       
        {
            return {
                accessToken: this.jwtService.sign({user: user.firstName , email: user.email}),
                user: userr
            }
        }

    }
}
