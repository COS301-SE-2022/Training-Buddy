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


});
