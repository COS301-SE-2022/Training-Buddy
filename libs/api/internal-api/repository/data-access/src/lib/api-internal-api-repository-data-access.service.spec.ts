import { Test } from '@nestjs/testing';
import { ApiInternalApiRepositoryDataAccessService } from './api-internal-api-repository-data-access.service';
import { PrismaService } from '@training-buddy/api/shared/services/prisma//data-access';

import {
  UserEntity,
  UserDto,
  LoginInput,
  ActivityStat,

} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';

jest.mock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');

const ActivityStatMock: jest.Mocked<ActivityStat> = new ActivityStat() as ActivityStat
const UserEntityMock: jest.Mocked<UserEntity> = new UserEntity() as UserEntity;
// const UserDtoMock: jest.Mocked<UserDto> = {
//   email:'tester@gmail.com',
//   gender: 'Male',
//   location: 'Hatfield, Pretoria',
//   password: 'password'
// }


describe('ApiInternalApiRepositoryDataAccessService', () => {
  
  let service: ApiInternalApiRepositoryDataAccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiInternalApiRepositoryDataAccessService, PrismaService],
    }).compile();

    service = module.get(ApiInternalApiRepositoryDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

    // /* Testing the creater user function */
    // describe('createUser', () => {
    //   const result = UserDtoMock;
    //   it('should allow user to create profile', () => {
    //     expect(service.createUser(UserDtoMock)).toEqual(result);
    //   });
    // });
    
      /* Testing the login function */
      describe('login', () => {
        it('should allow user to login', () => {
          try{

            expect(service.login('tester@gmail.com')).toHaveReturned;

          } catch(error) {
            fail(error);
          }
        });
      });

      /* Testing FindAll function - by location*/
      // describe('findAll', () => {
      //   const locationResult = UserEntityMock.location;
      //   it('should find all users location', async () => {
      //     try{
      //       expect(service.findAll(locationResult)).toHaveReturned;

      //     } catch(error) {
      //       fail(error);
      //     }
      //   });
      // })


});
