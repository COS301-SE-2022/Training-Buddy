import { Module } from '@nestjs/common';
import { TrainingBuddyApiResolver } from './training-buddy-api.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ApiInternalApiRepositoryDataAccessService } from '@training-buddy/api/internal-api/repository/data-access';
import { PrismaService } from '@training-buddy/api/shared/services/prisma//data-access' ;
import { TrainingBuddyServiceService, LoginGuard,ApiInternalApiServiceTrainingBuddyServiceModule  } from '@training-buddy/api/internal-api/service/training-buddy-service'
@Module({
  controllers: [],
  imports: [ApiInternalApiServiceTrainingBuddyServiceModule],
  providers: [TrainingBuddyApiResolver,TrainingBuddyServiceService, LoginGuard, ApiInternalApiRepositoryDataAccessService ,PrismaService ],
  exports: [],
})
export class ApiInternalApiApiTrainingBuddyApiModule {}
