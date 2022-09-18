import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewscheduleComponent } from './viewschedule.component';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { 
  ApolloTestingModule,
 } from 'apollo-angular/testing';


describe('ViewscheduleComponent', () => {
  let component: ViewscheduleComponent;
  let fixture: ComponentFixture<ViewscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewscheduleComponent ],
      imports:[
        ReactiveFormsModule,
        UiModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        ApolloTestingModule,
      ],
      providers: [
        Apollo, 
        CookieService
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test getWorkouts query
   */
  describe('getWorkouts', () => {
    it('should query getWorkouts', () => {

      const spy = jest.spyOn(component, 'getWorkouts');

      const op = component.getWorkouts('tester@gmail.com').subscribe();

      op.add(() => {
        expect(component.getWorkouts).toEqual({
          sender: 'tester1@gmail.com',
          receivers: 'tester2@gmail.com',
          workout:{
            title: 'Example Workout',
            id: '1',
            startTime: '2021-08-01T12:00:00.000',
            organiser: 'Tester One',
            participants: {
              userName: 'Tester Two',
              userSurname: 'Tester',
              location: 'Cape Town',
              longitude: '18.42322',
              latitude: '-33.918861',
              stravaToken: '1234567890',
              dob: '1990-01-01T00:00:00.000',
              gender: 'Male',
              email: 'tester2@gmail.com',
              cellNumber: '0123456789',
              id: '1',
              bio: 'I love running and riding in the early mornings',
              metrics: {
                lift: '3',
                run: '4',
                swim: '2',
                ride: '5',
              },
              buddies: ['tester2@gmail.com'],
              distance: '10',
            },
            activityType: 'Run',
            startPoint: 'Cape Town',
            proposedDistance: '10',
            proposedDuration: '60',

          }
        });

      });

      expect(spy).toHaveBeenCalled();

    });
  });


  /**
   * Test getUserName query
   */
  describe('getUserName', () => {
    it('should query getUserName', () => {

      const spy = jest.spyOn(component, 'getUserName');

      const op = component.getUserName('tester@gmail.com').subscribe();

      op.add(() => {
        expect(component.getUserName).toEqual({
          userName: 'Tester',
          userSurname: 'Tester',
        });

      });

      expect(spy).toHaveBeenCalled();
    
    });
  });

});
