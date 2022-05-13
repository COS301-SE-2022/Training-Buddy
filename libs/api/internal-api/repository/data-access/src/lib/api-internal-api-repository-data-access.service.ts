import { Injectable, Param } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime';
import { UserDto, ActivityStat } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import { PrismaService } from '@training-buddy/api/shared/services/prisma//data-access' ;
import { emit } from 'process';

@Injectable()
export class ApiInternalApiRepositoryDataAccessService {
    constructor(private prisma: PrismaService) {}

    //used for signing up
    async createUser(@Param() user:UserDto){
       return await this.prisma.user.create({
            data: {
                email: user.email,
                userName: user.userName,
                userSurname: user.userSurname,
                cellNumber: user.cellNumber,
                dob: user.dob,
                gender: user.gender,
                location: user.location,
                password: user.password
            }
        })
    }

    //used for logging in
    async login(@Param() email:string){
        return await this.prisma.user.findUnique({
            where: {email:email}
        })
    }

    //used to filter users by location
    async findAll(@Param() location: string){
        return await this.prisma.user.findMany({
            where:{location: location}
        })
    }

    //used to add an activity statistic for a specific user
    async createActivityStatistic(@Param() stat:ActivityStat){
        return await this.prisma.activityStatistic.create({
            data: {
                activity: stat.activity ,
                email: stat.email ,
                XP: stat.XP ,
                insight: stat.insight
            }
        })
    }

    //retrieve all activity statistics for a user
    async getAllActivityStatistics(@Param() userEmail: string){
        return await this.prisma.activityStatistic.findMany({
            where:{email: userEmail}
        })
    }

    async updateUserSurname(@Param() userSurname: string, @Param() email: string){
        return await this.prisma.user.update({
            where: {
                email: email
            },
            data: {
                userSurname: userSurname
            }
        })
    }

    async updateUserName(@Param() userName: string, @Param() email: string){
        return await this.prisma.user.update({
            where: {
                email: email
            },
            data: {
                userSurname: userName
            }
        })
    }

    async updateEmail(@Param() newEmail: string, @Param() oldEmail: string){
        return await this.prisma.user.update({
            where: {
                email: oldEmail
            },
            data: {
                email: newEmail
            }
        })
    }

    async updateGender(@Param() gender: string, @Param() email: string){
        return await this.prisma.user.update({
            where: {
                email: email
            },
            data: {
                gender: gender
            }
        })
    }

    async updateCellNumber(@Param() cellNumber: string, @Param() email: string){
        return await this.prisma.user.update({
            where: {
                email: email
            },
            data: {
                cellNumber: cellNumber
            }
        })
    }

    async updateLocation(@Param() location: string, @Param() email: string){
        return await this.prisma.user.update({
            where: {
                email: email
            },
            data: {
                location: location
            }
        })
    }

    async updatePassword(@Param() password: string, @Param() email: string){
        return await this.prisma.user.update({
            where: {
                email: email
            },
            data: {
                password: password
            }
        })
    }


}
