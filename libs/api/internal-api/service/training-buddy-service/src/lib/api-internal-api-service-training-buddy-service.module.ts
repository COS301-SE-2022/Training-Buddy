import { Module } from '@nestjs/common';
import { TrainingBuddyServiceService } from './training-buddy-service.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { LoginGuard } from './login.guard';
import { JwtStrategy } from './jwt-strategy';
import { JwtAuthGuard} from './jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers: [],
  imports: [PassportModule, JwtModule.register({
    signOptions: { expiresIn: '600s'},
    secret:"hide"//TODO hide this 
  }),], 
  providers: [TrainingBuddyServiceService, LocalStrategy, LoginGuard , JwtStrategy , JwtAuthGuard],
  exports: [TrainingBuddyServiceService],
})
export class ApiInternalApiServiceTrainingBuddyServiceModule {}
