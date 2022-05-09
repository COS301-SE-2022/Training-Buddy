import { Injectable } from '@nestjs/common';
import {UserDto , UserEntity} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';
@Injectable()
export class TrainingBuddyServiceService {
    constructor(private jwtService : JwtService){}
    private readonly users = [
        {
            userName: 'Muzi',
            userSurname: 'Ndlovu',
            location:'Pretoria',
            gender: 'Male',
            email: 'muzi@gmail.com',
            cellNumber: 434434444343,
            password: 'hello123'
        },
        {
            userName: 'Taku',
            userSurname: 'Muguti',
            location:'Pretoria',
            gender: 'Male',
            email: 'Taku@gmail.com',
            cellNumber: 3443443443434,
            password: 'hello177'
        }
    ]
    async validateUser(email: string , password: string):Promise<any> {
        const user = await this.findOne(email);
        const valid = await bcrypt.compare(password, user?.password)

        if(user && valid){ //TODO: make more secure 
            const{password , ...result} = user;
            return result;
        }
        return null;
    }
    async findOne(email: string): Promise<any>{
        return await this.users.find((user) => user.email === email)
    }
    async signup(userdto : UserDto){
        let user = await this.findOne(userdto.email);
        if(user){{
            throw new Error("User Exists");
        }}
        else{
            console.log(user)
            const password = await bcrypt.hash(userdto.password, 10)
            user = {...userdto,password };
            this.users.push(user)
            console.log(this.users)
            return user;
        }
    }
    finduser(username:string){
        return this.users.find((user)=>user.userName === username);
    }
    findAll(){
        return this.users;
    }
    async login( user: UserEntity){
        const {...result}=user
        {
            return {
                accessToken: this.jwtService.sign({user: user.userName , email: user.email}),
                user: result
            }
        }

    }
}
