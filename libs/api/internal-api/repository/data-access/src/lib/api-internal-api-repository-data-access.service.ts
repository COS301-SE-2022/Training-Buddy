import { Injectable, Param } from '@nestjs/common';
import { activityStatistic } from '@prisma/client';
import { UserDto } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import { PrismaService } from '@training-buddy/api/shared/services/prisma//data-access' ;
import { emit } from 'process';

@Injectable()
export class ApiInternalApiRepositoryDataAccessService {
    constructor(private prisma: PrismaService) {}

    //used for signing up
    async createUser(@Param() user:UserDto){
       return  await this.prisma.user.create({
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
        })
    }

    //used for logging in
    async login(@Param() email:string){
        await this.prisma.user.findUnique({
            where: {email:email}
        }).then(async(value)=>{
            console.log(value) ;
            return value;
        })
    }

    //used to filter users by location
    async findAll(@Param() location: string){
        await this.prisma.user.findMany({
            where:{location: location}
        }).then(async(value)=>{
            console.log(value);
            return value ;
        })
    }

    //used to add an activity statistic for a specific user
    async createActivityStatistic(@Param() stat:ActivityStatistic){
        await this.prisma.activityStatistic.create({
            data: {
                activity: stat.activity ,
                user: stat.email ,
                experienceLevel: stat.XP ,
                insight: stat.insight
            }
        }).then(async (value) => {
            console.log(value) ;
            return value ;
        })
    }

    //retrieve all activity statistics for a user
    async getAllActivityStatistics(@Param() userEmail: string){
        await this.prisma.activityStatistic.findMany({
            where:{user: userEmail}
        }).then(async (value) => {
            console.log(value) ;
            return value ;
        })
    }
}
