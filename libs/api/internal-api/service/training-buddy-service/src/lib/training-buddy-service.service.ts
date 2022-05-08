import { Injectable } from '@nestjs/common';
import {UserDto} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
@Injectable()
export class TrainingBuddyServiceService {
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
    }
    findOne(email: string){
        return this.users.find((user) => user.email === email)
    }
    create(userdto : UserDto){
        const user = {...userdto};
        this.users.push(user)
        return 'the new user';

    }
    finduser(username:string){
        return this.users.find((user)=>user.userName === username);
    }
    findAll(){
        return this.users;
    }
}
