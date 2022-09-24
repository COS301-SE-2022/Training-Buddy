import { Test, TestingModule } from '@nestjs/testing';
import { TrainingBuddyApiResolver } from './training-buddy-api.resolver';
import { JwtModule } from '@nestjs/jwt';
import {UserEntity } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import { TrainingBuddyServiceService } from '@training-buddy/api/internal-api/service/training-buddy-service'
import { ApiInternalApiRepositoryDataAccessService } from '@training-buddy/api/internal-api/repository/data-access';
import {
  LoginResponse,
  LoginInput,
  UserDto,
  ActivityStat

} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';

import { resourceLimits } from 'worker_threads';
import { resolve } from 'path';


describe('TrainingBuddyApiResolver', () => {
  let resolver: TrainingBuddyApiResolver; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingBuddyApiResolver,JwtModule, TrainingBuddyServiceService,UserEntity, ApiInternalApiRepositoryDataAccessService],
      imports: [JwtModule.register({
        signOptions: { expiresIn: '86400s'},
        secret:"hide"//TODO hide this 
      })]
    }).compile();

    resolver = module.get<TrainingBuddyApiResolver>(TrainingBuddyApiResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

});
