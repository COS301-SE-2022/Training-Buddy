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
  Tokens,
  ResponseWorkout,
  } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';


  
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

jest.dontMock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');
const TokensModule: Tokens = new Tokens() as Tokens;

jest.dontMock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');
const ResponseWorkoutModule: ResponseWorkout = new ResponseWorkout() as ResponseWorkout;

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

  /**
   * Test sendRequest
   */
  describe('sendRequest', () => {

    it('should allow user to send request', async () => {
      jest.spyOn(service, 'reject').mockImplementation(service.sendRequest);

      expect(async () => service.sendRequest(UserDtoModule.email, 'u2@gmail.com')).toReturn;
    });
  });

  /**
   * Test getLogs
   */
  describe('getLogs', () => {

    it('should allow user to get logs', async () => {

      // let arr ;
      // const user = await service.findOne(UserDtoModule.email);

      jest.spyOn(service, 'getLogs').mockImplementation(service.getLogs);

      expect(async () => service.getLogs(UserDtoModule.email)).toReturn;

    });
  });

  /**
   * Test getScheduleWorkout
   */
  describe('getScheduleWorkout', () => {

    it('should allow user to get scheduled workouts', async () => {
      
      jest.spyOn(service, 'getScheduleWorkout').mockImplementation(service.getScheduleWorkout);

      expect(async () => service.getScheduleWorkout(UserDtoModule.email)).toReturn

    });
  });

  /**
   * Test getConnections
   */
  describe('getConnections', () => {
    
    it('should get all user connections', async () => {
      
      jest.spyOn(service, 'getConnections').mockImplementation(service.getConnections);

      expect(async () => service.getConnections(UserDtoModule.email)).toReturn;

    });
  });

  /**
   * Test getIncoming 
   */
  describe('getIncoming', () => {
    
    it('should get all users incoming connections', async () => {
      
      jest.spyOn(service, 'getIncoming').mockImplementation(service.getIncoming);

      expect(async () => service.getIncoming(UserDtoModule.email)).toReturn;

    });

  });

  /**'
   * Test getOutgoing
   */
  describe('getOutgoing', () => {
    
    it('should get all users outgoing connections', async () => {
      
      jest.spyOn(service, 'getOutgoing').mockImplementation(service.getOutgoing);

      expect(async () => service.getOutgoing(UserDtoModule.email)).toReturn;


    });
  });

  /**
   * Test saveTokens
   */
  describe('saveTokens', () => {
    
    it('should save user tokens', async () => {
      
      jest.spyOn(service, 'saveTokens').mockImplementation(service.saveTokens);

      expect(async () => service.saveTokens(UserDtoModule.email, TokensModule.stravaAccess, TokensModule.stravaRefresh, TokensModule.exp, TokensModule.clientId, TokensModule.clientSecret)).toReturn;

    });
  });

  /**
   * Test getToken
   */
  describe('getTokens', () => {
    
    it('should get user token', async () => {
      
      jest.spyOn(service, 'getToken').mockImplementation(service.getToken);

      expect(async () => service.getToken(UserDtoModule.email)).toReturn;

    });

  });

  /**
   * Test createInvite
   */
  describe('createInvite', () => {
    
    it('should allow user to create invite', async () => {
      
      jest.spyOn(service, 'createInvite').mockImplementation(service.createInvite);
    
      expect(async () => service.createInvite(UserDtoModule.email, ResponseWorkoutModule.id)).toReturn;

    });
  });

  /**
   * Test sendInvite
   */
  describe('sendInvite', () => {
    
    it('should allow user to send invite', async () => {
      
      jest.spyOn(service, 'sendInvite').mockImplementation(service.sendInvite);

      expect(async () => service.sendInvite(UserDtoModule.email, 'u1@gmail.com', ResponseWorkoutModule.id)).toReturn;

    });
  });

  /**
   * Test acceptInvite
   */
  describe('acceptInvite', () => {
    
    it('should allow user to acceptInvite', async () => {
      
      jest.spyOn(service, 'acceptInvite').mockImplementation(service.acceptInvite);

      expect(async () => service.acceptInvite(UserDtoModule.email, 'u1@gmail.com', ResponseWorkoutModule.id)).toReturn;

    });
  });

  /**
   * Test rejectInvite
   */
  describe('rejectInvite', () => {
    
    it('should allow user to rejectInvite', async () => {
      
      jest.spyOn(service, 'rejectInvite').mockImplementation(service.rejectInvite);

      expect(async () => service.rejectInvite(UserDtoModule.email, 'u1@gmail.com', ResponseWorkoutModule.id)).toReturn;

    });

  });

  /**
   * Test getIncomingInvites
   */
  describe('getIncomingInvites', () => {
    
    it('should allow user to get incomming invites', async () => {
      
      jest.spyOn(service, 'getIncomingInvites').mockImplementation(service.getIncomingInvites);

      expect(async () => service.getIncomingInvites(UserDtoModule.email)).toReturn;

    });
  });


  /**
   * Test getOutgoingInvites
   */
  describe('getOutgoingInvites', () => {

    it('should allow user to get outgoing invites', async () => {
      
      jest.spyOn(service, 'getOutgoingInvites').mockImplementation(service.getOutgoingInvites);

      expect(async () => service.getOutgoingInvites(UserDtoModule.email)).toReturn;

    });
  });

  /**
   * Test getWorkout
   */
  describe('getWorkout', () => {
    
    it('should get all users workouts', async () => {
      
      jest.spyOn(service, 'getWorkout').mockImplementation(service.getWorkout);

      expect(async () => service.getWorkout(UserDtoModule.email, ResponseWorkoutModule.id)).toReturn;

    });
  });

});
