import { Injectable} from '@nestjs/common';
import {UserDto , UserEntity,ActivitySchedule,  ErrorMessage, ActivityStat,ActivityLog ,UpdateUser, Userconfig, Invite} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';
import { sha256 } from 'js-sha256';
const  SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
import { ApiInternalApiRepositoryDataAccessService } from '@training-buddy/api/internal-api/repository/data-access';
let recommended : any [] =[]
@Injectable()
export class TrainingBuddyServiceService {
    /**
     * 
     * @param jwtService 
     */
    constructor(private jwtService : JwtService, private repoService : ApiInternalApiRepositoryDataAccessService , private user : UserEntity){}
    async sendEmail(email : string , user : UserEntity) {
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey =process.env.SENDINBLUE_API_KEY;
        const  apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        let  sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        const rec = await this.findOne(email);
        sendSmtpEmail = {
            to: [{
                email: email,
                name: rec.userName
            }],
            templateId: 1,
            params: {
                name: 'John',
                surname: 'Doe'
            },
            headers: {
                'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
            }
        };
        
        apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
          //console.log('API called successfully. Returned data: ' + data);
          return data
        }, function(error) {
          console.error(error);
        });
    }
    /**
     * 
     * @param email 
     * @param password 
     * @returns null || UserEntity
     */
    async validateUser(email: string , password: string):Promise<any> {
        const user = await this.findOne(email);
        let valid = false;
        if(user){
            const encrypted = sha256(password);
            valid = await bcrypt.compare(encrypted, user?.password)
        }
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
        let total = 0;

        const person =  await this.repoService.login(email);
        if(person){
            if(person.ratings.length > 0){
                    person.ratings.forEach(element => {
                        total += element;
                });
                person.ratings = total/person.ratings.length;
            }
        }
        return person;
    }
    /**
     * 
     * @param userdto 
     * @returns ErrorMessage
     */
    async signup(userdto : UserDto){
        let user = await this.findOne(userdto.email);
        if(await user){
            const item = new ErrorMessage;
            item.message = "User Already Exists failure";
            return item;
        }
        else{
            const encrypted = sha256(userdto.password);
            const password = await bcrypt.hash(encrypted, 10)
            user = {...userdto, password };
            const ret = await this.repoService.createUser(user);
            const item = new ErrorMessage;
            item.message = ret.id;
            return item;
        }
    }
    /**
     * @param string
     * @returns Array Of UserEntity
     */
    async getAll(email:string ){

        const arr = await this.repoService.findAll(email);
    

        let distance = 0;
        let longitude = 0;
        let latitude = 0;
        const people = [];
        for(let i = 0; i < arr.length; i++){
            if(arr[i].email=== email){
               distance=  arr[i].distance
               longitude = arr[i].longitude
               latitude = arr[i].latitude
            }
        }
        for(let i = 0; i < arr.length; i++){
            if(arr[i].email!=email && arr[i].metrics!=null){
                if(await this.calculatedistance(arr[i].latitude, arr[i].longitude, latitude, longitude)<= distance){
                    people.push(arr[i]);
                }
            }
        }
        people.push(await this.findOne(email));
        return this.collaborativeFiltering(people , email);


   

   
       
    }
    /**
     * 
     * @param user 
     * @returns 
     */
    async login(user:any){
        {
            return {
                accessToken: this.jwtService.sign({user: user.userName , email: user.email}),
                user: user
            }
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
            if(user.distance){
               response = await this.repoService.updateDistance( user.distance, user.userSurname);
            }
            if(user.longitude){
                response = await this.repoService.updateLongitude( user.longitude, user.userSurname);
            }
            if(user.latitude){
                response = await this.repoService.updateLatitude( user.latitude, user.userSurname);
            }
            if(user.running){
                response = await this.repoService.updateRunning( user.running, user.userSurname);
            }
            if(user.riding){
                response = await this.repoService.updateRiding( user.riding, user.userSurname);
            }
            if(user.swimming){
                response = await this.repoService.updateSwimming( user.swimming,user.userSurname);
            }
            if(user.weightLifting){
                response = await this.repoService.updateLifting( user.weightLifting,user.userSurname);
            }
            if(user.bio){
                response = await this.repoService.updateBio( user.bio, user.userSurname);
            }
            if(response){
                item.message ="Successful";
                return item;
            }
            item.message ="failure";
            return item;
        
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
        const val =  await this.repoService.userConfig(config);
        const item = new ErrorMessage;
        if(val == false){
            item.message = "failure"
            return item;

        }
        else{
            item.message = "success"
            return item;
        }
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
       const user = await this.findOne(actLog.email);
       const item = new ErrorMessage;
       if(!user){
            item.message = "failure"
            return item;

        }else{
            await this.repoService.logActivity(actLog);
            item.message = "success"
            return item;
        }
    }
    /**
     * 
     * @param userID 
     * @returns 
     */
    async getUser(userID:string){
        return this.repoService.getUser(userID)
    }
    /**
     * 
     * @param actSchedule 
     * @return ErrorMessage
     */
    async activitySchedule(actSchedule:ActivitySchedule){
        const user = await this.findOne(actSchedule.email);
       const item = new ErrorMessage;
       if(!user){
            item.message = "failure"
            return item;
        }else{
            await this.repoService.scheduleWorkout(actSchedule);
            item.message = "success"
            //TODO broadcast to all buddies 
            return item;
        }
        
    }
    /**
     * 
     * @param userEmail 
     * @param otherEmail 
     * @return ErrorMessage
     */
    async accept(otherEmail: string, userEmail: string) {
        let res =  await this.repoService.deleteConnectionRequest(userEmail, otherEmail);
       const item = new ErrorMessage;
       if(res === false){
            item.message = "failure to deleteConnectionRequest"
            return item;
        }
        else{
                res =  await this.repoService.makeConnection(userEmail, otherEmail);
                item.message = "Success Connection made"
                return item;
            }   
    }
    /**
     * 
     * @param userEmail 
     * @param otherEmail 
     * @return ErrorMessage
     */
    async reject(userEmail: string, otherEmail: string) {
        const res =  await this.repoService.deleteConnectionRequest(userEmail, otherEmail);
       const item = new ErrorMessage;
       if(res === false){
            item.message = "failure to deleteConnectionRequest"
            return item;
        }
        else{
            item.message = "Success User Rejected"
            return item;
        }
    }

    /**
     * 
     * @param userEmail 
     * @param otherEmail
     * @return ErrorMessage 
     */
    async sendRequest(userEmail: string, otherEmail: string) {
        const user1 = await this.findOne(userEmail);
        const user2 = await this.findOne(otherEmail);
       const item = new ErrorMessage;
       if(!user1 && !user2){
            item.message = "failure to connect request"
            return item;
        }
        else{
            const check = await this.getIncoming(otherEmail);
            for(let i = 0; i < check.length; i++){
                if(check[i].email == userEmail){
                    item.message = "Failure Sent Request already"
                    return item;
                }
            }
            await this.repoService.makeConnectionRequest(userEmail, otherEmail);
            item.message = "Success User Connection Sent"
            return item;
        }
    }
    /**
     * 
     * @param userEmail 
     * @return [ResponseLog]
     */
    async getLogs(userEmail: string) {
        let arr ;
        const user = await this.findOne(userEmail);
       if(!user){
            return arr;
        }else{
            arr = await this.repoService.getLogs(userEmail);
            return arr;
        }
    }
    /**
     * 
     * @param userEmail 
     * @return [ResponseWorkout]
     */
    async getScheduleWorkout(userEmail: string) {
        let arr =[];
        const user = await this.findOne(userEmail);
       if(!user){
            return arr;
        }else{
            arr = await this.repoService.getScheduledWorkouts(userEmail);
            return arr;
        }
    }
    /**
     * 
     * @param userEmail 
     * @return [ResponseWorkout]
     */
    async getWorkoutHistory(userEmail: string) {
        let arr =[];
        const user = await this.findOne(userEmail);
         if(!user){
            return arr;
        }
        else{
            arr = await this.repoService.getWorkoutHistory(userEmail);
            return arr;
        }
    }
    /**
     * 
     * @param userEmail 
     * @return [userEntities]
     */
    async getConnections(userEmail: string) {
        const user = await this.findOne(userEmail);
        const arr=[];
        if(user){
            if(!user.buddies){
                return arr;
            }
            for(let i = 0; i < user.buddies.length; i++){
                arr.push(await this.findOne(user.buddies[i]))
            }
            return arr;
        }
        else return arr;
    }

    /**
     * 
     * @param userEmail 
     * [userEntities]
     */
    async getOutgoing(userEmail: string) {
        const user = await this.findOne(userEmail);
        const outgoing =[]
        if(user){
            const arr= await this.repoService.getOutgoingRequests(userEmail)
            if(arr.length<=0){
                return arr;
            }
            for(let i = 0; i < arr.length; i++){
                outgoing.push(await this.findOne(arr[i].receiver))
            }
            return outgoing;
        }
        else return outgoing;
    }
    /**
     * 
     * @param userEmail 
     */
    async getIncoming(userEmail: string) {
        const user = await this.findOne(userEmail);
        const outgoing =[]
        if(user){
            const arr= await this.repoService.getIncomingRequests(userEmail)
            if(arr.length<=0){
                return arr;
            }
            for(let i = 0; i < arr.length; i++){
                outgoing.push(await this.findOne(arr[i].sender))
            }
            return outgoing;
        }
        else return outgoing;
    }
    /**
     * 
     * @param email 
     * @param access 
     * @param refresh 
     * @returns ErrorMessage
     */
    async saveTokens(email:string  , access:string , refresh:string, exp: number, clientId: any, clientSecret : any, id:any){
        const user = await this.findOne(email);
        const item = new ErrorMessage;
        if(!user ){
             item.message = "failure no user"
             return item;
         }
         else{
             await this.repoService.saveTokens(email , access , refresh, exp, clientId, clientSecret, id)
             item.message = "Success User Tokens Saved "
             return item;
         }
    }
    /**
     * 
     * @param email 
     * @returns tokens
     */
    async getToken(email:string){
        const user = await this.findOne(email);
        const item = new ErrorMessage;
        if(!user ){
             return item;
             
         }
         else{
            return await this.repoService.getTokens(email)
          
         }


    }
    /**
     * 
     * @param email 
     * @param startTime 
     * @returns ErrorMessage
     */
    async createInvite(email:string , workoutID: string){
        const user = await this.findOne(email);
        const item = new ErrorMessage;
        if(!user ){
            item.message ="failure"
             return item;
         }
         else{
            await this.repoService.createInvite(email, workoutID)
            item.message ="success"
            return item;

         }
    }
    /**
     * 
     * @param email 
     * @param receiver 
     * @param startTime 
     * @returns ErrorMessage
     */
    async sendInvite(email:string ,receiver:string ,  workoutID: string){
        const user = await this.findOne(email);
        const item = new ErrorMessage;
        const arr = []
        arr.push(receiver) 
        if(!user ){
             return item;
         }
         else{
            const val = await this.repoService.sendInvite(email,arr,workoutID)
            if(val){
                item.message = "Success";
               this.sendEmail(receiver , user);
                return item
            }else{
                item.message = "Failure";
                return item
            }
         }
    }
    /**
     * 
     * @param email 
     * @param sender 
     * @param startTime 
     * @returns 
     */
    async acceptInvite(email:string ,sender:string ,  workoutID: string){
        const user = await this.findOne(email);
        const item = new ErrorMessage;

        if(!user ){
             return item;
         }
         else{
            const val = await this.repoService.acceptInvite(email,sender,workoutID)
            if(val){
                item.message = "Success";
                return item
            }else{
                item.message = "Failure";
                return item
            }
         }
    }
    /**
     * 
     * @param email 
     * @param sender 
     * @param startTime 
     * @returns 
     */
    async rejectInvite(email:string ,sender:string ,  workoutID: string){
        const user = await this.findOne(email);
        const item = new ErrorMessage;

        if(!user ){
             return item;
         }
         else{
            const val = await this.repoService.rejectInvite(email,sender,workoutID)
            if(val){
                item.message = "Success";
                return item
            }else{
                item.message = "Failure";
                return item
            }
         }
    }
    /**
     * 
     * @param email 
     * @returns 
     */
    async getIncomingInvites(email:string){
       const user = await this.findOne(email);
       if(!user){
            return new Invite;
        }else{
            return await this.repoService.getIncomingInvites(email)    
        }
    }
    /**
     * 
     * @param email 
     * @returns 
     */
    async getOutgoingInvites(email:string){
        const user = await this.findOne(email);
        if(!user){
             return new Invite;
         }else{
             return await this.repoService.getOutgoingInvites(email)    
         }
    }
    /**
     * 
     * @param userEmail 
     * @param startTime 
     * @returns ResponseWorkout 
     */
    async getWorkout(userEmail: string , workoutID) {
        const arr =[];
        const user = await this.findOne(userEmail);
       if(!user){
            return arr;
        }else{
            return await this.repoService.getWorkout(userEmail,workoutID);
           
        }
    }
    /**
     * 
     * @param dataset 
     * @returns newDataset
     */
    cleanDataset (dataset){
        const  newDataset = {};
        for(const i in dataset){
            const email = dataset[i].email;
            newDataset[email] = dataset[i].metrics;
        }
        return newDataset;
    }
    len(obj){
        let len=0;
        for(const i in obj){
            len++
        }
        return len;
    }
    pearson_correlation(dataset,p1,p2){
        const existp1p2 = {};
        for(const item in dataset[p1]){
                    if(item in dataset[p2]){
                        existp1p2[item] = 1
                    }
                }
               const num_existence = this.len(existp1p2);
        if(num_existence ==0) return 0;
                let p1_sum=0,
                    p2_sum=0,
                    p1_sq_sum=0,
                    p2_sq_sum=0,
                    prod_p1p2 = 0;
                for(const item in existp1p2){
                    p1_sum += dataset[p1][item];
                    p2_sum += dataset[p2][item];
                    p1_sq_sum += Math.pow(dataset[p1][item],2);
                    p2_sq_sum += Math.pow(dataset[p2][item],2);
                    prod_p1p2 += dataset[p1][item]*dataset[p2][item];
                }
                const numerator =prod_p1p2 - (p1_sum*p2_sum/num_existence);
                const  st1 = p1_sq_sum - Math.pow(p1_sum,2)/num_existence;
                const  st2 = p2_sq_sum -Math.pow(p2_sum,2)/num_existence;
                const  denominator = Math.sqrt(st1*st2);
        if(denominator ==0) return 0;
                else {
                    const val = numerator / denominator;
                    recommended.push({name:p2, value:val});
                    return val;
                }
    }
    getRecommendations(dataset,person){
        const totals = {};
        const simSums = {};
        for(const other in dataset){
            if(other == person) continue;
            const sim = this.pearson_correlation(dataset,person,other);
            if(sim<=0) continue;
            for(const item in dataset[other]){
                if(item in dataset[person]) continue;
                totals[item] = totals[item] || 0;
                totals[item] += dataset[other][item]*sim;
                simSums[item] = simSums[item] || 0;
                simSums[item] += sim;
            }
        }
        const rankings: any= [];
        for(const item in totals){
            rankings.push([totals[item],item]);
        }
        rankings.sort();
        rankings.reverse();
        return rankings;
    }
   getFullDatasetFromRecommended(dataset,recommended){
        const newDataset: any= []
        recommended.forEach(i =>{
            if(i.value > 0.50){
                dataset.forEach(element => {
                    if(element.email == i.name){
                        newDataset.push(element)
                    }
                })
            }
        }
    )
    return newDataset;
   }
   sortRecommended(recommended){
    recommended.sort(function(a,b){
        return b.value - a.value;
    })
    return recommended;
    }

    
    async collaborativeFiltering(people: any[]  , email: string){
        if(people.length <=0){
            return people;
        }
        recommended = []
        this.getRecommendations(this.cleanDataset(people),email)
        this.sortRecommended(recommended)
        
        const newset = this.getFullDatasetFromRecommended(people,recommended)
        const dataset = this.removeUser(newset,email)
        if(dataset.length <=0){
            const val =this.removeUser(people,email);
            return val
        }
    return dataset;
    }
    removeUser(dataset,email){
        const newDataset = [];
        dataset.forEach(element => {
            if(element.email != email){
                newDataset.push(element)
            }
        });
        return newDataset;
    }
     /**
     * 
     * @param workoutID 
     * @returns ErrorMessage
     */
      async completeWorkout(workoutID: string, email: string) {
        const val = await this.repoService.completeWorkout(workoutID, email);
        const item = new ErrorMessage;
       if(val==null) {
           item.message = "failure"
           return item;
       }else{
              item.message = "success"
              return item;
       }
    }
    async addRating(userEmail: string, rating: number) {
        const val = await this.repoService.addRating(userEmail, rating);
        const item = new ErrorMessage;
         if(val==false) {
           item.message = "failure"
           return item;
        }
        else{
            item.message = "success"
            return item;
        }
    }
  


}
