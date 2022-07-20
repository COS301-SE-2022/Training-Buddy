import { Test, TestingModule } from '@nestjs/testing';
import { TrainingBuddyServiceService } from './training-buddy-service.service';
import { ApiInternalApiRepositoryDataAccessService } from '@training-buddy/api/internal-api/repository/data-access';
import { JwtModule } from '@nestjs/jwt';
import {  UserDto,
          ActivityStat,
          UserEntity} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';


jest.dontMock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');
const UserDtoModule: UserDto = new UserDto() as UserDto;

jest.mock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');
const mockUserDto: jest.Mocked<UserDto> = new UserDto() as UserDto;

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
    
    it.only('should allow user to signup', async () => {

      jest.spyOn(service, 'signup').mockImplementation(service.signup);

      expect(service.signup).toReturn;
      
    });
  });

  /**
   * Test getAll Function
   */
  describe('getAll', () => {
    
    it('should get all users', async () => {

      jest.spyOn(service, 'getAll').mockImplementation(service.getAll);

      expect(service.getAll).toReturn;

    });
  });


});
