import { Test, TestingModule } from '@nestjs/testing';
import { TrainingBuddyServiceService } from './training-buddy-service.service';
import { ApiInternalApiRepositoryDataAccessService } from '@training-buddy/api/internal-api/repository/data-access';
import { JwtModule } from '@nestjs/jwt';

import {  UserDto,
  ActivityStat,
  UserEntity,
  UpdateUser,
  Userconfig,
  ActivitySchedule,
  ErrorMessage
  } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import { userInfo } from 'os';

  
jest.dontMock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');
const UserDtoModule: UserDto = new UserDto() as UserDto;

jest.dontMock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');
const ActivityStatModule: ActivityStat = new ActivityStat() as ActivityStat;

jest.dontMock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');
const UpdateUserModule: UpdateUser = new UpdateUser() as UpdateUser;

jest.dontMock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');
const UserconfigModule: Userconfig = new Userconfig() as Userconfig;

jest.dontMock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');
const ActivityScheduleModule: ActivitySchedule = new ActivitySchedule() as ActivitySchedule;

describe('TrainingBuddyServiceService', () => {
  let service: TrainingBuddyServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingBuddyServiceService,ApiInternalApiRepositoryDataAccessService,UserEntity],
      imports: [JwtModule.register({
        signOptions: { expiresIn: '600s'},
        secret:"hide"//TODO hide this 
      })]
    }).compile();

    service = module.get<TrainingBuddyServiceService>(
      TrainingBuddyServiceService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /**
   * Test validateUser
   */
     describe('validateUser', () => {
      /**
       * Positive Test
       */
      it('should validate user', async () => {
  
        const positiveResult = null;
  
        jest.spyOn(service, 'validateUser').mockImplementation(() => positiveResult);
  
        expect(await service.validateUser(UserDtoModule.email, UserDtoModule.password)).toBe(positiveResult);
  
      });
  
      /**
       * Negative Test
       */
  
      it('should throw validateUser error', async () => {
  
        const negativeResult = 0;
  
        jest.spyOn(service, 'validateUser').mockImplementation(async () => negativeResult);
  
        expect(await service.validateUser(UserDtoModule.email, UserDtoModule.password)).toThrowError;
   
      });
      
    });

  /**
   * Test findOne Function
   */
  describe('findOne', () => {

    it('should find and return one user', async () => {

      jest.spyOn(service, 'findOne').mockImplementation(async () => service.findOne);

      expect(service.findOne(UserDtoModule.email)).toReturn;

    });
    
  });

    /**
   * Test signup
   */

     describe('signup', () => {
    
      it('should allow user to signup', async () => {
  
        jest.spyOn(service, 'signup').mockImplementation(service.signup);
  
        expect(async () => service.signup(UserDtoModule)).toReturn;
        
      });
    });
  
    /**
     * Test getAll Function
     */
    describe('getAll', () => {
      
      it('should get all users', async () => {
  
        jest.spyOn(service, 'getAll').mockImplementation(service.getAll);
  
        expect(async () => service.getAll(UserDtoModule.email)).toReturn;
  
      });
    });

  /**
   * Test login Function
  */
  describe('login', () => {
    
    it('should allow user to login', async () => {

      jest.spyOn(service, 'login').mockImplementation(service.login)

      expect(service.login).toReturn;
    });
  });

  /**
   * Test createActivityStat 
   */

  describe('createActivityStat', () => {

    it('should allow user to createActivityStat', async () => {

      jest.spyOn(service, 'createActivityStat').mockImplementation(service.createActivityStat);

      expect(async () => service.createActivityStat(ActivityStatModule)).toReturn;

    });

  });

  /**
   * Test fetchUserStat 
   */
  describe('fetchUserStat', () => {
    
    it('should fetch user statistics', async () => {
      
      jest.spyOn(service, 'fetchUserStat').mockImplementation(service.fetchUserStat);

      expect(async () => service.fetchUserStat(UserDtoModule.email)).toReturn;

    });
  });

  /**
   * Test updateUser
   */

  describe('updateUser', () => {
    
    it('should allow user to update details', async () => {
      
      jest.spyOn(service, 'updateUser').mockImplementation(service.updateUser);

      expect(async () => service.updateUser(UpdateUserModule)).toReturn;

    });
  });

  /**
   * Test userConfig
   */
  describe('userConfig', () => {

    it('should allow user configure profile', async () => {

      jest.spyOn(service, 'userConfig').mockImplementation(service.userConfig);

      expect(async () => service.userConfig(UserconfigModule)).toReturn;

    });
  });

  /**
   * Test calculatedDistance
   */
  describe('calculatedistance', () => {
    
    it('should calculate distance', async () => {
      
      jest.spyOn(service, 'calculatedistance').mockImplementation(service.calculatedistance);
    
      expect(async () => service.calculatedistance(UserDtoModule.latitude, UserDtoModule.longitude, UserDtoModule.latitude, UserDtoModule.longitude));
      
    });
  });

  /**
   * Test toRad
   */

  // describe('toRad', () => {
    
  //   /**
  //    * Positive Test
  //    */
  //   it('should convert number to rad', async () => {
  //     const positiveResult = 10;
      
  //     jest.spyOn(service, 'toRad').mockImplementation(service.toRad);

  //     const returedResult = async () =>  service.toRad(positiveResult);

  //     expect(returedResult).toEqual((positiveResult * Math.PI / 180));

  //   });

  // });

  /**
   * Test activitySchedule
   */
  describe('activitySchedule', () => {
    
    it('should allow user to schedule activity', async () => {
      
      jest.spyOn(service, 'activitySchedule').mockImplementation(service.activitySchedule);

      expect(async () => service.activitySchedule(ActivityScheduleModule)).toReturn;
    });
  });

  /**
   * Test accept
   */

  describe('accept', () => {
    
    it('should should allow user to accept invite', async () => {
      
      jest.spyOn(service, 'accept').mockImplementation(service.accept);

      expect(async () => service.accept(UserDtoModule.email, 'u1@gmail.com')).toReturn;

    });
  });

  /**
   * Test reject
   */
  describe('reject', () => {

    it('should should allow user to accept invite', async () => {
      
      jest.spyOn(service, 'reject').mockImplementation(service.reject);

      expect(async () => service.accept(UserDtoModule.email, 'u1@gmail.com')).toReturn;
    
    });

  });

});
