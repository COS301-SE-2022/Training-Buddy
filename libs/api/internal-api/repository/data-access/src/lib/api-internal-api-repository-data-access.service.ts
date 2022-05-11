import { Injectable, Param } from '@nestjs/common';
import { UserDto } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import { PrismaService } from '@training-buddy/api/shared/services/prisma//data-access' ;

@Injectable()
export class ApiInternalApiRepositoryDataAccessService {
    constructor(private prisma: PrismaService) {}

    async createUser(@Param() user:UserDto){
        return await this.prisma.user.create({
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

    async login(@Param() email:string){
        return await this.prisma.user.findUnique({
            where: {email:email}
        })
    }
}
