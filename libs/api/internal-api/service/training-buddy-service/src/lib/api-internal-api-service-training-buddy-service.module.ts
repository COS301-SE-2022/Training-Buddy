import { Module } from '@nestjs/common';
import { TrainingBuddyServiceService } from './training-buddy-service.service';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [],
  providers: [TrainingBuddyServiceService, LocalStrategy],
  exports: [],
})
export class ApiInternalApiServiceTrainingBuddyServiceModule {}
