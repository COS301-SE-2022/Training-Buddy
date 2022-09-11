import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EditprofilepageComponent } from './editprofilepage.component';
import { Apollo } from 'apollo-angular';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
const firebase = {
  apiKey: 'AIzaSyD_61N0OLPsfAKHoawzDtIExK_BU3GR6hM',
  authDomain: 'training-buddy-2022.firebaseapp.com',
  databaseURL: 'https://training-buddy-2022-default-rtdb.firebaseio.com',
  projectId: 'training-buddy-2022',
  storageBucket: 'training-buddy-2022.appspot.com',
  messagingSenderId: '<your-messaging-sender-id>',
  appId: '445917436',
  measurementId: 'G-K7WPZTL3FJ'
}
describe('EditprofilepageComponent', () => {
  let component: EditprofilepageComponent;
  let fixture: ComponentFixture<EditprofilepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        RouterTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
      providers: [
        Apollo,
        CookieService,
        { provide: FIREBASE_OPTIONS, useValue:firebase }
      ],
      declarations: [ EditprofilepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprofilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test ngOnInit function
   */
  describe('ngOnInIt', () => {
    it('should call ngOnInit', () => {
      jest.spyOn(component, 'ngOnInit');

      component.ngOnInit();

      component.updateForm = component.frmBuilder.group({
        userName: new FormControl('TesterName'),
        userEmail: new FormControl('TesterSurname'),
        userCellNumber: new FormControl('0123456789'),
        userGender: new FormControl('Female'),
        userLocation: new FormControl('Hatfield'),
      });

      component.getCurrentUser().subscribe({
        next: (data: any) => {

          component.user = data.data.getOne;

          component.originalEmail = component.user.email;
          component.oldLocation = component.user.location;
          component.longitude = component.user.longitude;
          component.latitude = component.user.latitude;
          component.updateForm.setValue({
            userName: component.user.userName,
            userEmail: component.user.userEmail,
            userCellNumber: component.user.userCellNumber,
            userGender: component.user.userGender,
            userLocation: component.user.userLocation,
          });
        }
      });
      
      expect(component.ngOnInit).toHaveBeenCalled();

    });
  });

  /**
   * Test getCurrentUser function
   */
  describe('getCurrentUser', () => {
    it('should call getCurrentUser', () => {
      jest.spyOn(component, 'getCurrentUser');

      component.getCurrentUser();

      //Test getCurrentUser graphql query
      component.getCurrentUser().subscribe({
        next: (data: any) => {
          expect(data.data.getOne).toEqual({
            userName: 'TesterName',
            userSurname: 'TesterSurname',
            location: 'Hatfield',
            longitude: 0,
            latitude: 0,
            dob: '1990-01-01',
            gender: 'Male',
            email: 'tester@gmail.com',
            CellNumber: '0123456789',
            bio: '',
            metrics: {lift: 1, ride: 0, run: 1, swim: 0},
            buddies: []
          });
        }
      });

      expect(component.getCurrentUser).toHaveBeenCalled();
      
    });
  });


});
