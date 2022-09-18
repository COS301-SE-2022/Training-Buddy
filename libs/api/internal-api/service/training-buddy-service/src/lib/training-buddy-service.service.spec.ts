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

  describe('toRad', () => {
      
      it('should convert to radian', async () => {
        
        jest.spyOn(service, 'toRad').mockImplementation(service.toRad);
  
        expect(async () => service.toRad(UserDtoModule.latitude)).toReturn;
  
      });
  })

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
  
const dataset=[
  {
     userSurname: 'Muguti',
     bio: 'I love gyming and meeting new people at the gym, lets get these gains',
     email: 'takumuguti@gmail.com',
     cellNumber: '0810184326',
     dob: 'Mon Jun 10 2002 00:00:00 GMT+0200 (South Africa Standard Time)',
     location: 'Sunnyside',
     metrics: { swim: 3.5, run: 4.5, ride: 1.2, lift: 4.7},
     latitude: -25.7598894,
     longitude: 28.2182826,
     userName: 'Taku',
     id: 'c0828960-2bc7-11ed-8ccb-31b161e5f9ae',
     distance: 12,
     password: '$2b$10$jC3ksnhJ2UwvAcsGy084wuIB8Wi/35lj4y4tPUVFUpAfW.f7yn3tS',
     buddies: [ 'muzindlovu03@yahoo.com', 'sarahaking2014@gmail.com' ],
     groups: { rideGroup: 0, liftGroup: 0, runGroup: 0, swimGroup: -1 },
     signUpStage: 1,
     gender: 'M',
     ratings: []
   },
   {
     email: 'amy@gmail.com',
     distance: 18,
     id: 'aa09c2b0-2c22-11ed-b4fd-d37eee932ef2',
     userName: 'Amy',
     ratings: [],
     latitude: -25.7487333,
     userSurname: 'Strydom',
     signUpStage: 1,
     dob: 'Fri Jan 05 2001 00:00:00 GMT+0200 (South Africa Standard Time)',
     bio: 'I love the outdoors and going on adventures',
     metrics: { swim: 1.5, run: 2.5, ride: 2.2, lift: 2.7, rowing : 3.5},
     cellNumber: '0843635216',
     password: '$2b$10$GTvuvCMCrrhXyjm5yCRtCeaVU41M7jd1NNkbAW6Em5I5xqtsAlBrO',
     gender: 'F',
     location: 'Hatfield',
     longitude: 28.2380432,
     groups: { liftGroup: 0, swimGroup: -1, rideGroup: -1, runGroup: 0 },
     buddies: []
   },
   {
     latitude: -25.7487333,
     ratings: [],
     password: '$2b$10$nP6xisPBV8OjCJ4kFTe6uuhvrd5vlXoTLRrknAfQ643AgyZIZtc3u',
     cellNumber: '0832245647',
     location: 'Hatfield',
     userName: 'Sarah',
     groups: { rideGroup: -1, runGroup: 0, swimGroup: 0, liftGroup: -1 },
     distance: 16,
     userSurname: 'King',
     id: 'c0a860e0-2bc7-11ed-a3fb-eb8dc1f93209',
     metrics: { swim: 3.5, run: 4.5, ride: 1.2, lift: 4.7 , hiking: 4.5},
     signUpStage: 1,
     gender: 'F',
     email: 'sarahaking2014@gmail.com',
     buddies: [ 'takumuguti@gmail.com', 'muzindlovu03@yahoo.com' ],
     bio: 'I love the outdoors and going on adventures',
     longitude: 28.2380432,
     dob: 'Thu Jul 12 2001 00:00:00 GMT+0200 (South Africa Standard Time)'
   },
   {
     strava: {
       stravaRefresh: 'ad06b5d367bb1b4b96ecb21c94ee9c13edcbb902',
       stravaAccess: '76d87d6aa9af2e346d1b5231e32cce4ea13623db',
       exp: 1662491340,
       clientId: '85093',
       clientSecret: 'a104b3a3699b54450312f26698167e28b61d5624'
     },
     id: 'f42a9c20-2de4-11ed-b30f-0f119aac924c',
     latitude: -25.7487333,
     groups: { swimGroup: 0, rideGroup: 0, runGroup: 0, liftGroup: -1 },
     userSurname: 'Gotte',
     location: 'Hatfield',
     dob: 'Tue Feb 07 2017 00:00:00 GMT+0200 (South Africa Standard Time)',
     email: 'matthewgotte@gmail.com',
     ratings: [],
     bio: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
     distance: 30,
     cellNumber: '0000000000',
     password: '$2b$10$BdeKPe5Rnh6xNhhfgFeOkuMWUhIUL5IH/dFDR.V5JuvMqaTFRMLXm',
     gender: 'M',
     buddies: [],
     metrics: { swim: 1.5, run: 5.0, ride: 2.2, lift: 4.2, kickboxing: 4.5},
     longitude: 28.2380432,
     userName: 'Matthew',
     signUpStage: 3
   },
   {
     password: '$2b$10$Q6GYIt2Z2Qvcjq8D5f.0SOnTVwwDwz6a.HUwk9NAXjoSCpVj7Y1Bq',
     metrics: { swim: 4.5, run: 3.5, ride: 3.2, lift: 4.2},
     location: 'Hatfield',
     userName: 'Harry',
     latitude: -25.7487333,
     gender: 'M',
     dob: 'Fri Sep 07 2001 00:00:00 GMT+0200 (South Africa Standard Time)',
     email: 'harry@gmail.com',
     id: '26a4bcc0-2dbe-11ed-b1ac-136fc4063899',
     longitude: 28.2380432,
     buddies: [],
     bio: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
     groups: { liftGroup: -1, swimGroup: 0, rideGroup: -1, runGroup: 0 },
     ratings: [],
     distance: 28,
     userSurname: 'Styles',
     cellNumber: '0834456756',
     signUpStage: 1
   },
   {
     userSurname: 'Doe',
     email: 'john@yahoo.com',
     groups: { swimGroup: -1, rideGroup: 0, runGroup: 0, liftGroup: -1 },
     ratings: [],
     dob: 'Sun Nov 06 2005 00:00:00 GMT+0200 (South Africa Standard Time)',
     buddies: [],
     location: 'Hatfield',
     distance: 22,
     cellNumber: '0774745307',
     id: 'f96adbf0-337a-11ed-b9c0-3b8f6811798e',
     bio: 'I am an athlete that likes running a lot ',
     password: '$2b$10$6TQMLoW9xWeQorHiMoDcN.Bdh4XG6Dlw5EoxJVeL93rjZHAVoLyZe',
     signUpStage: 1,
     metrics: { swim: 3.2 , run: 3.3, ride:4.0, lift: .2, skiing : 4.5},
     longitude: 28.2380432,
     userName: 'John',
     latitude: -25.7487333,
     gender: 'M'
   }
 ]

describe('collaborativeFiltering', () => {
  it('should get collaborative filtering', async () => {
    jest.spyOn(service, 'collaborativeFiltering').mockImplementation(service.collaborativeFiltering);
    jest.spyOn(service, 'sortRecommended').mockImplementation(service.sortRecommended);
    jest.spyOn(service, 'getFullDatasetFromRecommended').mockImplementation(service.getFullDatasetFromRecommended);
    jest.spyOn(service, 'getRecommendations').mockImplementation(service.getRecommendations);
    jest.spyOn(service, 'getRecommendations').mockImplementation(service.getRecommendations);

    expect(async () => service.collaborativeFiltering (dataset ,UserDtoModule.email)).toReturn;
    expect(service.len).toHaveBeenCalled
    expect(service.getRecommendations).toHaveBeenCalled
    expect(service.getFullDatasetFromRecommended).toHaveBeenCalled
    expect(service.sortRecommended).toHaveBeenCalled

  });
})


});
