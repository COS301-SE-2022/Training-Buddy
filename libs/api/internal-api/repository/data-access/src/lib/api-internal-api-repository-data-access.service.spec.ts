import { Test } from '@nestjs/testing';
import { ApiInternalApiRepositoryDataAccessService } from './api-internal-api-repository-data-access.service';
import { UserDto, 
  UserEntity,
  ActivityStat,
  Userconfig,
  ActivityLog,
  ActivitySchedule } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import { QuerySnapshot } from 'firebase/firestore';


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

      
        const expected = service.usersCollection.where('id', '==', '1')
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





});
