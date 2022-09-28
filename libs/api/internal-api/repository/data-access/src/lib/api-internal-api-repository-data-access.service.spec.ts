import { Test } from '@nestjs/testing';
import { ApiInternalApiRepositoryDataAccessService } from './api-internal-api-repository-data-access.service';
import { UserDto, 
  UserEntity,
  ActivityStat,
  Userconfig,
  ActivityLog,
  ActivitySchedule } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';



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
   * Test getActivityScheduleCollection function
   */

  describe('getActivityScheduleCollection', () => {
    it('should return a collection of activity schedules', async () => {
      const result = await service.getActivityScheduleCollection();

      expect(result).toEqual(service.scheduledWorkoutCollection);

    });
  });



  /**
   * Test createUser function
   */
  describe('createUser', () => {

    it('should return a user', () => {

      const user: UserDto = {
        userName: 'testerName',
        userSurname: 'testerSurname',
        location: 'Hatfield',
        longitude: 0,
        latitude: 0,
        stravaToken: '',
        gender: 'M',
        dob: '1990-01-01',
        email: 'tester@gmail.com',
        cellNumber: '0123456789',
        password: ''
      }

      const result = service.createUser(user);

      service.usersCollection.doc().set(user)
      .then(result => {
        expect(result).toEqual(user);
      });

      expect(service.createUser(user)).toEqual(result);

    });
  });

  /**
   * Test login function
   */
  describe('login', () => {
      
      it('should allow a user to login', () => {

        const userEmail = 'tester@gmail.com';	

        const result = service.usersCollection.where('email', '==', userEmail)
        .get().then((result) => {
          if(result.docs[0]){
            let total = 0;
            const person = result.docs[0].data();

            if(person.rating.length > 0){
              person.rating.forEach(element => {
                total += element;
              });
              person.rating = Math.round(total / person.rating.length);
            }
            else{
              person.rating = 0;
            }
            expect(service.login(userEmail)).toEqual(person);
          };

          expect(service.login(userEmail)).toEqual(false);

      });

    });

  });

  /**
   * Test getUser function
   */
  describe('getUser', () => {
      it('should return a user', () => {

      
        const returnedResult = service.usersCollection.where('id', '==', '1')
        .get().then((result) => {
         if(result.docs[0]){
            expect(service.getUser('1')).toEqual(result.docs[0].data());
        } 
        else{
          expect(service.getUser('1')).toEqual(false);
        }

      });
      
    });
  });

  /**
   * Test getMetrics function
   */
  describe('getMetrics', () => {
      it('should return a user metrics', () => {
          const data = [];
          const userEmail = 'tester@gmail.com';
          
          service.usersCollection.where('email','!=', userEmail)
          .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              data.push(doc.data());
          });

          jest.spyOn(service, 'getMetrics')
          .mockImplementation((data) => Promise.resolve(service.getMetrics(userEmail)));

          expect(service.getMetrics(userEmail)).resolves.toEqual(data);

        });
      });
    });

    /**
     * Test findAll function
     */
    describe('findAll', () => {
 
      it('should final all users', () => {

        const userEmail = 'tester@gmail.com';
        const users = [];

        service.usersCollection.get().then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
              if(doc.data().signupStage > 0){
                users.push(doc.data());
              }
            });
        });

        expect(service.findAll(userEmail)).resolves.toEqual(users);
      });
    });
    
    /**
     * Test findByStravaId
     */
    describe('findByStravaId', () => {
      it('should return a user by strava id', () => {
        const stravaId = '123456';

        service.usersCollection.where('strava.ownerId', '==', stravaId)
        .get().then((result) => {
          if(result.docs[0]){
            expect(service.findByStravaId(stravaId)).toEqual(result.docs[0].data());
          } else {
            expect(service.findByStravaId(stravaId)).toEqual(false);
          }
        });
      });
    });

      /**
       * test saveTokens function
       */
    describe('saveTokens', () => {
      it('should save user tokens', () => {

        const access = '123456';
        const email = 'tester@gmail.com';
        const refresh = '123456';
        


        const data = {
          stava: {
            stravaAccess: access, 
            stravaRefresh: refresh,
            exp: '2022-01-01',
            cliendId: '',
            clientSecret: '',
            ownerId: '',
          },
          signUpStage: 3,
        }


        const toLog = [];

        service.getActivities(access).then((activities: any) => {
          activities.data.forEach(activity => {
            let valid = false;
            let type = "";

            if(activity.type == "Run"){
              valid = true;
              type = "run";
            }else if(activity.type == "Ride"){
              valid = true ;
              type = "ride" ;
          }else if(activity.type == "Swim"){
              valid = true ;
              type = "swim" ;
          }else if(activity.type == "Workout"){
              valid = true ;
              type = "lift" ;
          }

          if(valid){
            const date = Math.floor(new Date(activity.start_date).getTime() / 1000)

            const log = {
                id: activity.id,
                user: email,
                activityType: type,
                dateComplete: date,
                distance: activity.distance,
                name: activity.name,
                speed: activity.average_speed,
                time: activity.moving_time
            }
    
            toLog.push(log) ;
        }

        service.logManyActivities(toLog);

        const result = service.usersCollection.where('email', '==', email)
        .get().then((result) => {
          if(result.docs[0]){
            expect(service.usersCollection.doc(result.docs[0].id).update(data)).toEqual(data);
          } else {
            expect(service.usersCollection.doc(result.docs[0].id).update(data)).toEqual(false);
          }
        });

        expect(service.saveTokens(email, access, refresh, 123, '', '', '')).toEqual(result);

        })
      })

    });
  }); 

  /**
   * Test getTokens function
   */
  describe('getTokens', () => {
    it('should return tokens', () => {
      const data = [];
      const userEmail = 'tester@gmail.com';

      const result = service.usersCollection.where('email', '==', userEmail)
      .get().then(async (result) => {
        data.push(result.docs[0].data().stravaAccess);
        data.push(result.docs[0].data().stravaRefresh);

        expect(service.getTokens(userEmail)).toEqual(data);
      })

      expect(service.getTokens(userEmail)).toEqual(result);
    
    }) 
  })

  /**
   * Test addRating function
   */
  describe('addRating', () => {
    it('should add a rating', () => {
      const email = 'tester@gmail.com';
      const rating = 5;

      const result = service.usersCollection.where('email', '==', email)
      .get().then((result) => {
        if(result.docs[0]){
          expect(service.usersCollection.doc(result.docs[0].id).update({rating: rating})).toEqual(rating);
        } else {
          expect(service.usersCollection.doc(result.docs[0].id).update({rating: rating})).toEqual(true);
        }
        expect(service.addRating(email, rating)).toEqual(result);
      });
      });
    });


  /**
   * Test updateCellNumber functions
   */
  describe('updateCellNumber', () => {
    it('should allow user to update cellNumber', () => {
      const email = 'tester@gmail.com';
      const cellNumber = '1234567890';

      const result = service.usersCollection.where('email', '==', email)
      .get().then((result) => {
        if(result.docs[0]){
          expect(service.usersCollection.doc(result.docs[0].id).update({cellNumber: cellNumber})).toEqual(cellNumber);
        } else {
          expect(service.usersCollection.doc(result.docs[0].id).update({cellNumber: cellNumber})).toEqual(true);
        }
        expect(service.updateCellNumber(email, cellNumber)).toEqual(result);
      });
    });
  });

  /**
   * Test updateEmail functions
   */
  describe('updateEmail', () => {	
    it('should allow user to update email', () => {
      const password = '';
      const email = 'tester@gmail.com';

      const result = service.usersCollection.where('email', '==', email)
      .get().then((result) => {
        if(result.docs[0]){
          expect(service.usersCollection.doc(result.docs[0].id).update({email: email})).toEqual(email);
        } else {
          expect(service.usersCollection.doc(result.docs[0].id).update({email: email})).toEqual(true);
        }
        expect(service.updateEmail(email, password)).toEqual(result);
      });
    });
  });

  /**
   * Test updateLocation function
   */
  describe('updateLocation', () => {
    it('should allow user to update location', () => {
      const email = 'tester@gmail.com';	
      const location = 'Hatfield';

      const result = service.usersCollection.where('email', '==', email)
      .get().then((result) => {
        if(result.docs[0]){
          expect(service.usersCollection.doc(result.docs[0].id).update({location: location})).toEqual(location);
        } else {
          expect(service.usersCollection.doc(result.docs[0].id).update({location: location})).toEqual(true);
        }
      });

      expect(service.updateLocation(email, location)).toEqual(result);

    });
  });

  /**
   * Test updatePassword function
   */
  describe('updatePassword', () => {
    it('should allow user to update password', () => {
      const email = 'tester@gmail.com';
      const password = 'password';

      const result = service.usersCollection.where('email', '==', email)
      .get().then((result) => {
        if(result.docs[0]){
          expect(service.usersCollection.doc(result.docs[0].id).update({password: password})).toEqual(password);
        } else {
          expect(service.usersCollection.doc(result.docs[0].id).update({password: password})).toEqual(true);
        }
      });
      expect(service.updatePassword(password, email)).toEqual(result);
    });
  });

  /**
   * Test updateUserName function
   */
  describe('updateUserName', () => {
    it('should allow user to update username', () => {
      const email = 'tester@gmail.com';	
      const username = 'tester';

      const result = service.usersCollection.where('email', '==', email)
      .get().then((result) => {
        if(result.docs[0]){
          expect(service.usersCollection.doc(result.docs[0].id).update({username: username})).toEqual(username);
        } else {
          expect(service.usersCollection.doc(result.docs[0].id).update({username: username})).toEqual(true);
        }
      });     
      expect(service.updateUserName(username, email)).toEqual(result);
    });
  });

  /**
   * Test updateUserSurname
   */
  describe('updateUserSurname', () => {
    it('should allow user to update surname', () => {
      const email = 'tester@gmail.com';
      const surname = 'tester';

      const result = service.usersCollection.where('email', '==', email)
      .get().then((result) => {
        if(result.docs[0]){
          expect(service.usersCollection.doc(result.docs[0].id).update({surname: surname})).toEqual(surname);
        } else {
          expect(service.usersCollection.doc(result.docs[0].id).update({surname: surname})).toEqual(true);
        }
      });
      expect(service.updateUserSurname(surname, email)).toEqual(result);
    });
  });

  /**
   * Test updateLongitude function
   */
  describe('updateLongitude', () => {
    it('should allow user to update longitude', () => {
      const email = 'tester@gmail.com';
      const longitude = 0;

      const result = service.usersCollection.where('email', '==', email)
      .get().then((result) => {
        if(result.docs[0]){
          expect(service.usersCollection.doc(result.docs[0].id).update({longitude: longitude})).toEqual(longitude);
        } else {
          expect(service.usersCollection.doc(result.docs[0].id).update({longitude: longitude})).toEqual(true);
        }
      });

      expect(service.updateLongitude(longitude, email)).toEqual(result);

    });
  });

});
