import { Injectable} from '@nestjs/common';
import {UserDto , UserEntity,ActivitySchedule,  ErrorMessage, ActivityStat,ActivityLog ,UpdateUser, Userconfig} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
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
        console.log(user)
        if(await user){
            const item = new ErrorMessage;
            item.message = "User Already Exists failure";
            return item;
        }
        else{
            const password = await bcrypt.hash(userdto.password, 10)
            user = {...userdto, password };
            await this.repoService.createUser(user);
            const item = new ErrorMessage;
            item.message = "User has Successfully Signed";
            return item;
        }
    }
    /**
     * @param string
     * @returns Array Of UserEntity
     */
    async getAll(email:string ){
        
        const arr = await this.repoService.findAll(email)
        let distance = 0;
        let longitude = 0;
        let latitude = 0;
        const people = [];
        for(let i = 0; i < arr.length; i){
            if(arr[i].email=== email){
               distance=  arr[i].distance
               longitude = arr[i].longitude
               latitude = arr[i].latitude
            }
        }
        for(let i = 0; i < arr.length; i){
            if(arr[i].email!=email){
                if(await this.calculatedistance(arr[i].latitude, arr[i].longitude, latitude, longitude)<= distance){
                    people.push(arr[i]);
                }
            }
        }
        return people ;
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
               response.message= "Activity Addition failure";
               return response;
           }
        }else{
            response.message = "Could not find The user failure"
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
            item.message = "failure"
            return item;
        }

    }
    /**
     * 
     * @param config 
     * @return ErrorMessage
     */
    async userConfig(config: Userconfig){
        // let val =  await this.repoService.userConfig(config);
        // const item = new ErrorMessage;
        // if(val === false){
        //     item.message = "failure"
        //     return item;

        // }
        // else{
        //     item.message = "success"
        //     return item;
        // }
    } 
    /**
     * 
     * @param lat1 
     * @param lon1 
     * @param lat2 
     * @param lon2 
     * @returns distance 
     */
    async calculatedistance(lat1:number, lon1:number , lat2:number , lon2:number){
        const  R = 6371; // km
        const dLat = this.toRad(lat2-lat1);
        const  dLon = this.toRad(lon2-lon1);
        const  latone = this.toRad(lat1);
        const  lattwo = this.toRad(lat2);
  
        const  a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(latone) * Math.cos(lattwo); 
        const  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const  d = R * c;
        return d;

    }
    /**
     * 
     * @param Value 
     * @returns radians
     */
    toRad(Value):number
    {
        return Value * Math.PI / 180;
    }
    /**
     * 
     * @param actLog 
     * @return ErrorMessage
     */
    async activityLog(actLog :ActivityLog ){
    //    let res =  await this.repoService.userConfig(actLog);
    //    const item = new ErrorMessage;
    //    if(res === false){
    //         item.message = "failure"
    //         return item;

    //     }
    //     else{
    //         item.message = "success"
    //         return item;
    //     }
    }
    /**
     * 
     * @param actSchedule 
     * @return ErrorMessage
     */
    async activitySchedule(actSchedule:ActivitySchedule){
    //     let res =  await this.repoService.activitySchedule(actScheduleactLog);
    //    const item = new ErrorMessage;
    //    if(res === false){
    //         item.message = "failure"
    //         return item;

    //     }
    //     else{
    //         item.message = "success"
    //         //TODO broadcast to all buddies 
    //         return item;
    //     }
        
    }
    /**
     * 
     * @param userEmail 
     * @param otherEmail 
     * @return ErrorMessage
     */
    accept(userEmail: string, otherEmail: string) {
    //     let res =  await this.repoService.deleteConnectionRequest(userEmail, otherEmail);
    //    const item = new ErrorMessage;
    //    if(res === false){
    //         item.message = "failure to deleteConnectionRequest"
    //         return item;
    //     }
    //     else{
    //         res =  await this.repoService.makeConnection(userEmail, otherEmail);
    //         if(res === false){
    //             item.message = "failure to make Connection"
    //             return item;
    //         }else{
    //             item.message = "Success Connection made"
    //             return item;
    //         }
           
    //     }
    }
    /**
     * 
     * @param userEmail 
     * @param otherEmail 
     * @return ErrorMessage
     */
    reject(userEmail: string, otherEmail: string) {
    //     let res =  await this.repoService.deleteConnectionRequest(userEmail, otherEmail);
    //    const item = new ErrorMessage;
    //    if(res === false){
    //         item.message = "failure to deleteConnectionRequest"
    //         return item;
    //     }
    //     else{
    //         item.message = "Success User Rejected"
    //         return item;
    //     }
    }
    /**
     * 
     * @param userEmail 
     * @param otherEmail
     * @return ErrorMessage 
     */
    sendRequest(userEmail: string, otherEmail: string) {
    //     let res =  await this.repoService.createConnectionRequest(userEmail, otherEmail);
    //    const item = new ErrorMessage;
    //    if(res === false){
    //         item.message = "failure to connect request"
    //         return item;
    //     }
    //     else{
    //         item.message = "Success User Connection Sent"
    //         return item;
    //     }
    }
}
