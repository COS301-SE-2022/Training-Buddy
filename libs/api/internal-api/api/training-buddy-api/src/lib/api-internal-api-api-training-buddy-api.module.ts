import { Module } from '@nestjs/common';
import { TrainingBuddyApiResolver } from './training-buddy-api.resolver';
import { TrainingBuddyServiceService} from '@training-buddy/api/internal-api/service/training-buddy-service'
@Module({
  controllers: [],
  providers: [TrainingBuddyApiResolver,TrainingBuddyServiceService],
  exports: [],
})
export class ApiInternalApiApiTrainingBuddyApiModule {}
