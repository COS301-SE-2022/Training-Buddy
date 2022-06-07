import { Test } from '@nestjs/testing';
import { ApiInternalApiRepositoryDataAccessService } from './api-internal-api-repository-data-access.service';
import { UserDto, 
  ActivityStat,
  Userconfig,
  ActivityLog,
  ActivitySchedule } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import { resolve } from 'path';



jest.mock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');

const mockUserDto: jest.Mocked<UserDto> = new UserDto() as UserDto;


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
    
      // /* Testing the login function */
      // describe('login', () => {
      //   it('should allow user to login', () => {
      //     try{

      //       expect(service.login('tester@gmail.com')).toHaveReturned;

      //     } catch(error) {
      //       fail(error);
      //     }
      //   });
      // });

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
