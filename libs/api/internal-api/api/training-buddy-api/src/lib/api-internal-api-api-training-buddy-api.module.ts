import { Module } from '@nestjs/common';
import { TrainingBuddyApiResolver } from './training-buddy-api.resolver';
import { ApiInternalApiRepositoryDataAccessService } from '@training-buddy/api/internal-api/repository/data-access';
import { PrismaService } from '@training-buddy/api/shared/services/prisma//data-access' ;
import {UserEntity } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import { TrainingBuddyServiceService, LoginGuard,ApiInternalApiServiceTrainingBuddyServiceModule  } from '@training-buddy/api/internal-api/service/training-buddy-service'
@Module({
  controllers: [],
  imports: [ApiInternalApiServiceTrainingBuddyServiceModule],
  providers: [TrainingBuddyApiResolver,TrainingBuddyServiceService, LoginGuard, ApiInternalApiRepositoryDataAccessService ,PrismaService,  UserEntity ],
  exports: [],
})
export class ApiInternalApiApiTrainingBuddyApiModule {}
