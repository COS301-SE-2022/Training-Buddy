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

jest.mock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');
const mockUserConfig: jest.Mocked<Userconfig> = new Userconfig() as Userconfig;


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

      /**
       * Test userConfig
       */

      describe('userConfig', () =>{

        it('should configure a users profile', async () => {

          try {

            const spyUserConfig = jest.spyOn(service,'userConfig');

            spyUserConfig.mockImplementation(service.userConfig);

            expect(service.userConfig).toBeDefined;
            
          } catch (error) {

            fail(error);
          
          }
          
        });
      });

      /**
       * Test UpdateCellNumber function
       */

      describe('updateCellNumber', () => {
        const mockCellNumber = mockUserDto.cellNumber;
        const mockEmail = mockUserDto.email;

        try {

          it('should allow user to update cellNumber and email',async () => {

            const spyUpdateCellNumber = jest.spyOn(service, 'updateCellNumber');

            spyUpdateCellNumber.mockImplementation(service.updateCellNumber);

            expect(service.userConfig).toBeDefined;

            expect(service.updateCellNumber(mockCellNumber, mockEmail)).toBeCalled;

          })
        } catch (error) {
          
          fail(error);

        }

      });

      describe('updateDistance', () => {

        try{
          it('should allow user to update distance', async () => {

            const spyUpdateDistance = jest.spyOn(service,'updateDistance');

            spyUpdateDistance.mockImplementation(service.updateDistance);

            expect(service.updateDistance).toBeDefined;


          });
        } catch(error) {
          fail(error);
        }
        
      });

});
