import { Module } from '@nestjs/common';
import { TrainingBuddyApiResolver } from './training-buddy-api.resolver';

@Module({
  controllers: [],
  providers: [TrainingBuddyApiResolver],
  exports: [],
})
export class ApiInternalApiApiTrainingBuddyApiModule {}
