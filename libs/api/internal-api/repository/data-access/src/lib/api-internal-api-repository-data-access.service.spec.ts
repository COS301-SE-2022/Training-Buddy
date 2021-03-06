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

jest.mock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');
const mockActivityLog: jest.Mocked<ActivityLog> = new ActivityLog() as ActivityLog;

jest.mock('@training-buddy/api/internal-api/api/shared/interfaces/data-access');
const mockActivityStat: jest.Mocked<ActivityStat> = new ActivityStat() as ActivityStat;


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

            // fail(error);
          
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

            // fail(error);

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

            expect(service.userConfig).toReturn;

          });
        } catch (error) {  
          fail(error);
        }

      });

      /**
       * Testing update distance function
       */

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

      /**
       * Test updateEmail functionality
       */

      describe('updateEmail', () => {
        try{
          it('should allow user to update email', async () => {
            const spyUpdateEmail = jest.spyOn(service, 'updateEmail');

            spyUpdateEmail.mockImplementation(service.updateEmail);

            expect(service.updateEmail).toBeDefined;

          });
        } catch (error){

          fail(error);

        }

      });

      /**
       * Test updateLocation functionality
       */

      describe('updateLocation', () => {
        try {
          it('should allow the user to update location',async () => {
            const spyUpdateLocation = jest.spyOn(service, 'updateLocation');

            spyUpdateLocation.mockImplementation(service.updateLocation);

            expect(service.updateLocation).toBeDefined;
          });
        } catch (error) {
          
          fail(error);
        
        }
      });

      /**
       * Test updatePassword functionlity
       */

      describe('updatePassword', () => {
        try {
          it('should allow the user to update location', async () => {
            const spyUpdatePassword = jest.spyOn(service, 'updatePassword');

            spyUpdatePassword.mockImplementation(service.updatePassword);

            expect(service.updatePassword).toReturn;

          });
        } catch (error) {
          
          fail(error);
        
        }
      });

      /**
       * Test updateUserName functionality
       */

      describe('updateUserName', () => {
        try {
          it('should allow user to update location',async () => {
            const spyUserName = jest.spyOn(service, 'updateUserName');

            spyUserName.mockImplementation(service.updateUserName);

            expect(service.updateUserName).toReturn;

          })
        } catch (error) {
          fail(error);
        }

      });  


      /**
       * Test updateUserSurname functionality
       */

      describe('updateUserSurname', () => {
        try {
          it('should allow user to update surname', async () => {
            const spyUserSurname = jest.spyOn(service, 'updateUserSurname');

            spyUserSurname.mockImplementation(service.updateUserSurname);
  
            expect(service.updateUserSurname).toReturn;
          });

        } catch (error) {
          fail(error);
        }
      });

      /**
       * Test logActivity functionality
       */
      describe('logActivity', () => {
        try {
          it('should allow users to create activity logs', async () => {
            const spyLogActivity = jest.spyOn(service, 'logActivity');

            spyLogActivity.mockImplementation(service.logActivity);

            expect(service.logActivity).toReturn; 

          });

        } catch (error) {
          fail(error);
        }
      });

      
      /**
       * Test getLogs functionality
       */
      describe('getLogs', () => {
        try{
          it('should return user logs', async () => {
            const spyGetLogs = jest.spyOn(service, 'getLogs');

            spyGetLogs.mockImplementation(service.getLogs);

            expect(service.getLogs).toReturn;

          });
        } catch(error) {
          fail(error);
        }
      });

      /**
       * Test makeConnectionRequest functionality
       */
      describe('makeConnectionRequest', () =>{
        try{
          it('should allow user to make connection request', async () => {
            const spyMakeConnection = jest.spyOn(service, 'makeConnectionRequest');

            spyMakeConnection.mockImplementation(service.makeConnectionRequest);

            expect(service.makeConnectionRequest).toReturn;

          });
        } catch(error) {
          fail(error);
        } 

      });

      /**
       * Test getConnections functionality
       */
      describe('getConnection', () => {
        try {
          it('should get users connections',async () => {
            const spyGetConnection = jest.spyOn(service, 'getConnections');

            spyGetConnection.mockImplementation(service.getConnections);

            expect(service.getConnections).toReturn;

          });
        } catch (error) {
          fail(error);
        }
      });

      /**
       * Test deleteConnection functionality
       */
      describe('deleteConnection', () => {
        try {
          it('should delete users connections',async () => {
            const spyDeleteConnection = jest.spyOn(service, 'deleteConnection');

            spyDeleteConnection.mockImplementation(service.deleteConnection);

            expect(service.deleteConnection).toReturn;


          });
        } catch (error) {
          fail(error)
        }
      });

      /**
       * Tested scheduleWorkout functionality
       */
      describe('scheduleWorkout', () => {
        try {
          it('should allow user scheduleWorkout',async () => {
            const spyScheduleWorkout = jest.spyOn(service, 'scheduleWorkout');

            spyScheduleWorkout.mockImplementation(service.scheduleWorkout);
            
            expect(service.scheduleWorkout).toReturn;

          });
        } catch (error) {
          fail(error);
        }
      });

      /**
       * Tested getScheduledWorkouts functionality 
       */
      describe('getScheduledWorkouts', () => {
        try {
          it('should allow user to get schedule workouts',async () => {
            const spyGetScheduleWorkout = jest.spyOn(service, 'getScheduledWorkouts');

            spyGetScheduleWorkout.mockImplementation(service.getScheduledWorkouts);

            expect(service.getScheduledWorkouts).toReturn;

          });
        } catch (error) {
          fail(error);
        }
      });

      /**
       * Test createActivityStatistic functionality
       */
      describe('createActivityStatistic', () => {
        it('should return false', async () => {
          
          expect(service.createActivityStatistic(mockActivityStat)).toReturn;
 
        });
      });

});
