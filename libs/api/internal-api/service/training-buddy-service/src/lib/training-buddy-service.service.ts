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
    constructor(private jwtService : JwtService, private repoService : ApiInternalApiRepositoryDataAccessService){}
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
    /**
     * 
     * @param email 
     * @param password 
     * @returns null || UserEntity
     */
    async validateUser(email: string , password: string):Promise<any> {
        const user = await this.findOne(email);
        const valid = await bcrypt.compare(password, user?.password)
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
        return await this.repoService.login(email);
    }
    async signup(userdto : UserDto){
        let user = await this.findOne(userdto.email);
        if(user){{
            throw new Error("User Exixts");
        }}
        else{
            const password = await bcrypt.hash(userdto.password, 10)
            user = {...userdto,password };
            this.repoService.createUser(userdto);
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
