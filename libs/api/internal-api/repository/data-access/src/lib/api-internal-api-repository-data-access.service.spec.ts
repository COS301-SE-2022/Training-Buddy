import { Test } from '@nestjs/testing';
import { ApiInternalApiRepositoryDataAccessService } from './api-internal-api-repository-data-access.service';
import { UserDto, 
  UserEntity,
  ActivityStat,
  Userconfig,
  ActivityLog,
  ActivitySchedule } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';


jest.mock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');
const mockUserDto: jest.Mocked<UserDto> = new UserDto() as UserDto;


jest.mock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');
const UserEntityMock: jest.Mocked<UserEntity> = new UserEntity() as UserEntity;

describe('ApiInternalApiRepositoryDataAccessService', () => {
  
  let service: ApiInternalApiRepositoryDataAccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiInternalApiRepositoryDataAccessService],
    }).compile();

    service = module.get(ApiInternalApiRepositoryDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

    /**
     * Testing createUser
     */
    describe('createUser', () => {
      it('should allow user to create profile', () => {
        
        try {

            const spyMock = jest.spyOn(service, 'createUser');

            expect(spyMock.mockImplementation(service.createUser)).toHaveBeenCalled;
          
        } catch (error) {

            fail(error);
        }

     });
    });
    
      /**
       * Test Login Function
       */
      describe('login', () => {
        it('should allow user to login', async () => {
          try{
            const spyLogin = jest.spyOn(service, 'login');

            spyLogin.mockImplementation(service.login);

            expect(service.login).toReturn;

            expect(service.login('tester@gmail.com')).toHaveReturned;

          } catch(error) {

            fail(error);
          
          }
        });
      });


     /**
      * Test findAll Function - Location
      */
      describe('findAll', () => {
        const locationResult = UserEntityMock.location;
        it('should find all users location', async () => {
          try{

            const spyFindAll = jest.spyOn(service, 'findAll');

            spyFindAll.mockImplementation(service.findAll);

            
            expect(service.findAll(locationResult)).toHaveBeenCalled;

            expect(service.findAll).toReturn;


          } catch(error) {

            fail(error);
            
          }
        });
      });

});
