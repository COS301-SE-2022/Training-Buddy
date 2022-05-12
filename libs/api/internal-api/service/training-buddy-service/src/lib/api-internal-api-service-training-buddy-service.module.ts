import { Module } from '@nestjs/common';
import { TrainingBuddyServiceService } from './training-buddy-service.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { LoginGuard } from './login.guard';
import { JwtStrategy } from './jwt-strategy';
import { JwtAuthGuard} from './jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ApiInternalApiRepositoryDataAccessService } from '@training-buddy/api/internal-api/repository/data-access';
import { PrismaService } from '@training-buddy/api/shared/services/prisma//data-access' ;
import {UserEntity} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
@Module({
  controllers: [],
  imports: [PassportModule, JwtModule.register({
    signOptions: { expiresIn: '86400s'},
    secret:"hide"//TODO hide this 
  }),], 
  providers: [TrainingBuddyServiceService, LocalStrategy, LoginGuard , JwtStrategy , JwtAuthGuard, ApiInternalApiRepositoryDataAccessService,PrismaService, UserEntity],
  exports: [TrainingBuddyServiceService,JwtModule.register({
    signOptions: { expiresIn: '86400s'},
    secret:"hide"//TODO hide this 
  }),],
})
export class ApiInternalApiServiceTrainingBuddyServiceModule {}
