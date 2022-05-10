import { Module } from '@nestjs/common';
import { TrainingBuddyApiResolver } from './training-buddy-api.resolver';
import { JwtModule } from '@nestjs/jwt';
import { TrainingBuddyServiceService, LoginGuard,ApiInternalApiServiceTrainingBuddyServiceModule  } from '@training-buddy/api/internal-api/service/training-buddy-service'
@Module({
  controllers: [],
  imports: [ApiInternalApiServiceTrainingBuddyServiceModule],
  providers: [TrainingBuddyApiResolver,TrainingBuddyServiceService, LoginGuard  ],
  exports: [],
})
export class ApiInternalApiApiTrainingBuddyApiModule {}
