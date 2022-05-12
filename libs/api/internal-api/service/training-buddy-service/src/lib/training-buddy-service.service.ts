import { Injectable} from '@nestjs/common';
import {UserDto , UserEntity,  ErrorMessage, ActivityStat,UpdateUser} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
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
            await this.repoService.createUser(user);
            return user;
        }
    }
    /**
     * @param string
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
        
        {
            return {
                accessToken: this.jwtService.sign({user: user.userName , email: user.email}),
                user: user
            }
        }
    }
    /**
     * 
     * @param act 
     * @returns ErrorMessage
     */
    async createActivityStat(act: ActivityStat){
        const user = await this.findOne(act.email);
        const response = new ErrorMessage;
        if(user){
           const item = await this.repoService.createActivityStatistic(act);
           if(item){
               response.message = "Activity Successfully added";
               return response;
           }else{
               response.message= "Activity Addition Failed ";
               return response;
           }
        }else{
            response.message = "Could not find The user"
            return response;
        }
    }
    /**
     * 
     * @param email 
     * @returns Array of activityStat
     */
    async fetchUserStat(email : string){
        const user = await this.findOne(email);
        if(user){
            const stat = await this.repoService.getAllActivityStatistics(email);
            return stat;

        }else{
            return;
        }
    }
    /**
     * 
     * @param user 
     * @returns Response
     */
    async updateUser(user:UpdateUser){
        const users = await this.findOne(user.oldemail)
        const item = new ErrorMessage;
        let response; 
        if(users){
            if(user.cellNumber){
                response = await this.repoService.updateCellNumber(user.cellNumber, user.oldemail);
            }
            if(user.email){
                response = await this.repoService.updateEmail(user.email, user.oldemail);
            }
            if(user.location){
                response = await this.repoService.updateLocation(user.location, user.oldemail);
            }
            if(user.password){
                const password = await bcrypt.hash(user.password, 10)
                response = await this.repoService.updatePassword(password, user.oldemail);
            }
            if(user.userName){
                response = await this.repoService.updateUserName(user.userName, user.oldemail);
            }
            if(user.userSurname){
                response = await this.repoService.updateUserSurname(user.userSurname, user.oldemail);
            }
            if(response){
                item.message ="Successful";
                return item;
            }
        }else{
            item.message = "Failure"
            return item;
        }

    }
}
