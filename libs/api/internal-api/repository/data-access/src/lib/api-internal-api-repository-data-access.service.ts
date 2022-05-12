
import { Injectable, Param } from '@nestjs/common';
import { UserDto } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import { PrismaService } from '@training-buddy/api/shared/services/prisma//data-access' ;

@Injectable()
export class ApiInternalApiRepositoryDataAccessService {
    constructor(private prisma: PrismaService) {}

    async createUser(@Param() user:UserDto){
        await this.prisma.user.create({
            data: {
                email: user.email,
                firstName: user.userName,
                lastName: user.userSurname,
                contactNumber: user.cellNumber,
                dateOfBirth: user.dob,
                gender: user.gender,
                location: user.location,
                password: user.password
            }
        }).then(async(value)=>{
            console.log(value);
        });
    }

    async login(@Param() email:string){
        await this.prisma.user.findUnique({
            where: {email:email}
        }).then(async(value)=>{
            console.log(value);
        })
    }
    async findAll(@Param()location: string){
        await this.prisma.user.findMany({
            where:{location: location}
        }).then(async(value)=>{
            console.log(value);
        })
    }

    async addActivity(){
        
    }
}
