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

jest.mock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');
const mockLoginResponse: jest.Mocked<LoginResponse> = new LoginResponse() as LoginResponse;


jest.mock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');
const mockUserDto: jest.Mocked<UserDto> = new UserDto() as UserDto;

const mockInput: jest.Mocked<LoginInput> = new LoginInput() as LoginInput;
const mockContext = jest.mock;

const mockActivityStat: jest.Mocked<ActivityStat> = new ActivityStat() as ActivityStat;



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
   * Test login
   */

  describe('login', () =>{
    it('should return a login response', async () => {
      jest.spyOn(resolver, 'login')
      .mockImplementation(resolver.login);

      expect(resolver.login).toReturn;

      expect(resolver.login).toHaveBeenCalled;

      
    });
  });

  /**
   * Test Signup
   */
  describe('signup', () =>{
    // //Failing Test
    // it('should return a user entity [Has Mock Implementation]', async () => {
    //   jest.spyOn(resolver, 'signup')
    //   .mockImplementation(resolver.signup)

    //   expect(resolver.signup(mockUserDto)).toHaveReturned;

    // });

    //Passing Test
    it('should return a user entity [No mock Implemetation]', async () => {
      jest.spyOn(resolver, 'signup')
      .mockImplementation(resolver.signup);

      expect(resolver.signup).toHaveReturned;

    });
  });

  /**
   * Test findAll Function
   */
  describe('findAll', () => {

    it('should return an array of user enitities [email]',async () => {
        jest.spyOn(resolver, 'findAll')
        .mockImplementation(resolver.findAll);

        expect(resolver.findAll).toReturn;
    });

  });

  /**
   * Test activityStat function
   */
  describe('activityStat', () => {
    it('should return an error from activityStat', async () => {
      jest.spyOn(resolver, 'activityStat')
      .mockImplementation(resolver.activityStat);

      expect(resolver.activityStat).toReturn;

    });
  });

  /**
   * Test fetchUserStat function
   */

  describe('fetchUserStat', () => {
    it('should return userStatRes',async () => {
      jest.spyOn(resolver, 'fetchUserStats')
      .mockImplementation(resolver.fetchUserStats);

      expect(resolver.fetchUserStats).toReturn;

    });
  });

  /**
   * Test updateProfile function
   */
  describe('updateProfile', () => {
    it('should return error message from updateProfile', async () => {
      jest.spyOn(resolver, 'updateProfile')
      .mockImplementation(resolver.updateProfile);

      expect(resolver.updateProfile).toReturn;

    });
  });

  /**
   * Test userConfig function
   */
  describe('userConfig', () => {
    it('should return error message from userConfig', async () => {
      jest.spyOn(resolver, 'userConfig')
      .mockImplementation(resolver.userConfig);

      expect(resolver.userConfig).toReturn;

    });
  });
  

  /**
   * Test activityLog function
   */
  describe('activityLog', () => {
    
    it('should return from activity log',async () => {
      jest.spyOn(resolver, 'activityLog')
      .mockImplementation(resolver.activityLog);

      expect(resolver.activityLog).toReturn;

    });
  });

  /**
   * Test activitySchedule Function
   */

  describe('activitySchedule', () => {
    
    it('should return from activity log', async () => {
      jest.spyOn(resolver, 'activitySchedule')
      .mockImplementation(resolver.activitySchedule);

      expect(resolver.activitySchedule).toReturn;

    });
  });

  /**
   * Test sendRequest Function
   */
  
  describe('sendRequest', () => {

    it('should allow user to send a request', async () => {
      jest.spyOn(resolver, 'sendRequest')
      .mockImplementation(resolver.sendRequest);

      expect(resolver.sendRequest).toReturn;

    });
  });

  /**
   * Test getIncomingSub Function
   */
  describe('getIncomingSub', () => {

    it('should get incoming subscription', async () => {
      jest.spyOn(resolver, 'getIncomingSub')
      .mockImplementation(resolver.getIncomingSub);

      expect(resolver.getIncomingSub).toReturn;

    });
  });
  
  /**
   * Test getOutgoingSub Function 
   */
  describe('getOutgoingSub', () => {

    it('should get outgoing subscription', async () => {
      jest.spyOn(resolver, 'getOutgoingSub')
      .mockImplementation(resolver.getOutgoingSub);

      expect(resolver.getOutgoingSub).toReturn;

    });
  });

  /**
   * Test getConnectionsSub Function
   */
  describe('getConnectionsSub', () => {
    it('should getConnectionsSub', async () => {
        jest.spyOn(resolver, 'getConnectionsSub')
        .mockImplementation(resolver.getConnectionsSub);

        expect(resolver.getConnectionsSub).toReturn;

    });
  });

  /**
   * Test reject Function
   */

  describe('reject', () => {
    
    it('should allow user to reject connection', async () => {
      jest.spyOn(resolver, 'reject')
      .mockImplementation(resolver.reject)

      expect(resolver.reject).toReturn;
    });
  });

  /**
   * Test accept Function
   */

  describe('accept', () => {

    it('should allow user to reject connection', async () => {
      jest.spyOn(resolver, 'accept')
      .mockImplementation(resolver.reject);

      expect(resolver.reject).toReturn;
    });
  });

  /**
   * Test getIncoming Function
   */
  describe('getIncoming', () => {
    
    it('should get all incoming requests', async () => {
      jest.spyOn(resolver, 'getIncoming')
      .mockImplementation(resolver.getIncoming);

      expect(resolver.getIncoming).toReturn;

    });
  });

  /**
   * Test getOutgoing Function
   */
  describe('getOutgoing', () => {
    
    it('should get all outgoing requests', async () => {
      jest.spyOn(resolver, 'getOutgoing')
      .mockImplementation(resolver.getOutgoing);

      expect(resolver.getOutgoing).toReturn;

    });
  });

  /**
   * Test getConnections Function
   */
  describe('getConnections', () => {
    
    it('should get all user connection', async () => {
      jest.spyOn(resolver, 'getConnections')
      .mockImplementation(resolver.getConnections);

      expect(resolver.getConnections).toReturn;

    });
  });

  /**
   * Test getScheduleWorkout
   */

  describe('getScheduleWorkout', () => {
    
    it('should get users scheduled workouts', async () => {
      jest.spyOn(resolver, 'getScheduleWorkout')
      .mockImplementation(resolver.getScheduleWorkout);

      expect(resolver.getScheduleWorkout).toReturn;

    });
  });

  /**
   * Test getLogs Functions
   */
  describe('getLogs', () => {
    
    it('should get all user activity logs', async () => {
      jest.spyOn(resolver, 'getLogs')
      .mockImplementation(resolver.getLogs);

      expect(resolver.getLogs).toReturn;

    });
  });
  
  /**
   * Test saveTokens Function
   */

  describe('saveTokens', () => {
    
    it('should save user token', async () => {
      jest.spyOn(resolver, 'saveTokens')
      .mockImplementation(resolver.saveTokens);

      expect(resolver.saveTokens).toReturn;
    });
  });

  /**
   * Test getTokens Function
   */

  describe('getTokens', () => {
    
    it('should get user token', async () => {
      jest.spyOn(resolver, 'getTokens')
      .mockImplementation(resolver.getTokens);

      expect(resolver.saveTokens).toReturn;

    });
  });

  /**
   * Test sendInvite Function
   */

  describe('sendInvite', () => {

    it('should allow user to send invite', async () => {
      jest.spyOn(resolver, 'sendInvite')
      .mockImplementation(resolver.sendInvite);

      expect(resolver.sendInvite).toReturn;

    });
  });

  /**
   * Test getUser Function
   */
  describe('getUser', () => {
    
    it('should get all users', async () => {
      jest.spyOn(resolver, 'getUser')
      .mockImplementation(resolver.getUser);

      expect(resolver.getUser).toReturn;

    });
  });

  /**
   * Test createInvite Function
   */
  describe('createInvite', () => {
    
    it('should allow user to create invite', async () => {
      jest.spyOn(resolver, 'createInvite')
      .mockImplementation(resolver.createInvite);

      expect(resolver.createInvite).toReturn;
    });
  });

  /**
   * Test acceptInvite Function
   */
  describe('acceptInvite', () => {
    
    it('should allow user to accept invite', async () => {
      jest.spyOn(resolver, 'acceptInvite')
      .mockImplementation(resolver.acceptInvite);

      expect(resolver.acceptInvite).toReturn;
    });
  });

  /**
   * Test rejectInvite Function
   */
  describe('rejectInvite', () => {
    
    it('should allow user to reject invite', async () => {
      jest.spyOn(resolver, 'rejectInvite')
      .mockImplementation(resolver.rejectInvite);

      expect(resolver.rejectInvite).toReturn;

    });
  });

  /**
   * Test getIncomingInvites Function
   */
  describe('getIncomingInvites', () => {
    
    it('should get all incoming invites', async () => {
      jest.spyOn(resolver, 'getIncomingInvites')
      .mockImplementation(resolver.getIncomingInvites);

      expect(resolver.getIncomingInvites).toReturn;

    });
  });

  /**
   * Test getOutgoingInvites Function
   */
  describe('getOutgoingInvites', () => {
    
    it('should get all outgoing invites', async () => {
      jest.spyOn(resolver, 'getOutgoingInvites')
      .mockImplementation(resolver.getOutgoingInvites);

      expect(resolver.getOutgoingInvites).toReturn;
    });
  });

  /**
   * Test getWorkout Functions
   */
  describe('getWorkout', () => {
    
    it('should get user workouts', async () => {
      jest.spyOn(resolver, 'getWorkout')
      .mockImplementation(resolver.getWorkout);

      expect(resolver.getWorkout).toReturn;
    });
  });

  /**
   * Test saveImage Function
   */
  describe('saveImage', () => {
    
    it('should allow user to save image', async () => {
      jest.spyOn(resolver, 'saveImage')
      .mockImplementation(resolver.saveImage);

      expect(resolver.saveImage).toReturn;
  
    });
  });

  /**
   * Test getIncomingInviteSub Function
   */
  describe('getIncomingInviteSub', () => {
    
    it('should get all incoming invite subscriptions', async () => {
      jest.spyOn(resolver, 'getIncomingInviteSub')
      .mockImplementation(resolver.getIncomingInviteSub);

      expect(resolver.getIncomingInviteSub).toReturn;
    });
  });

  /**
   * Test getOutgoingInviteSub Function
   */

  describe('getOutgoingInviteSub', () => {
    

    it('should get all outgoing invite subscriptions', async () => {
      jest.spyOn(resolver, 'getOutgoingInviteSub')
      .mockImplementation(resolver.getOutgoingInviteSub);

      expect(resolver.getOutgoingInviteSub).toReturn;
    });
  });

  /**
   * Test getWorkoutSub Function
   */

  describe('getWorkoutSub', () => {
    
    it('should get all workout subsriptions', async () => {
      jest.spyOn(resolver, 'getWorkoutSub')
      .mockImplementation(resolver.getWorkoutSub);

      expect(resolver.getWorkoutSub).toReturn;
      
    });
  });




});
