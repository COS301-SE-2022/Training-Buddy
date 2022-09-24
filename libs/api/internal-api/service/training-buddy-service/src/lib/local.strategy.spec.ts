import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';
import { TrainingBuddyServiceService } from './training-buddy-service.service'
import { ApiInternalApiRepositoryDataAccessService } from '@training-buddy/api/internal-api/repository/data-access';
import {UserEntity} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import { JwtModule } from '@nestjs/jwt';
describe('LocalStrategy', () => {
  let provider: LocalStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategy, TrainingBuddyServiceService, ApiInternalApiRepositoryDataAccessService,UserEntity],
      imports: [JwtModule.register({
        signOptions: { expiresIn: '600s'},
        secret:"hide"//TODO hide this 
      })]
    }).compile();

    provider = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  /**
   * Test validate function
   */
  describe('validate', () => {
    it('should return a user', () => {

      //Mock user
      const user: any = {
        email: 'tester@gmail.com',
        password: '123456',
      };


      jest.spyOn(provider, 'validate').mockImplementation(() => Promise.resolve(user));

      expect(provider.validate(user.email, user.password)).resolves.toEqual(user);
      
    });

    it('should return user has no account error', () => {

      const user: any = {
        email: 'tester@gmail.com',
        password: '123456',
      };

      jest.spyOn(provider, 'validate').mockImplementation(() => Promise.resolve('User has no Account'));

      expect(provider.validate(user.email, user.password)).resolves.toEqual('User has no Account');
      

    });

  });


});
