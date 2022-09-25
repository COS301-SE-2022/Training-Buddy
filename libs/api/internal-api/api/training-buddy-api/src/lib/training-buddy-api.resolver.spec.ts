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
import e = require('express');


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

  /**
   * Test @Mutation signup
   */
  describe('signup', () => {
    it('should allow user to signup', () => {

      const mockTrainingBuddyService = {
        signup: jest.fn().mockImplementation((user: UserEntity) => {
          return user;
        })
      }

      const mockUserDto: UserDto = {
        email: "tester@gmail.com",
        password: "password",
        userName: 'testerName',
        userSurname: 'testerSurname',
        location: 'Hatfield',
        longitude: 0,
        latitude: 0,
        stravaToken: '',
        gender: 'M',
        dob: '1990-01-01',
        cellNumber: '0123456789'
      };

      
      resolver = new TrainingBuddyApiResolver(mockTrainingBuddyService as any);

      const trainingBuddyService = resolver['trainingBuddyService'];

      const result = trainingBuddyService.signup(mockUserDto);

      const promise = new Promise((resolve) => {
        resolve(result);
      });

      expect(promise).resolves.toEqual(mockUserDto);

    });


  });    

});
