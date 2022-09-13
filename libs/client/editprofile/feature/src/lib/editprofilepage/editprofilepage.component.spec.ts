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
import { Component } from '@angular/core';
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

  /**
   * Test onAutocompleteSelected function
   */
  describe('onAutocompleteSelected', () => {
    it('should test onAutocompleteSelected functionality', () => {
      jest.spyOn(component, 'onAutocompleteSelected');

      jest.spyOn(component, 'onAutocompleteSelected').mockImplementation(() => {
        component.vicinity = 'Hatfield';
      });

      component.onAutocompleteSelected('Hatfield');

      expect(component.onAutocompleteSelected).toHaveBeenCalled();

      expect(component.vicinity).toEqual('Hatfield');

    });
  });

  /**
   * Test onLocationSelected function
   */
  describe('onLocationSelected', () => {
    it('should test onLocationSelected functionality', () => {
      jest.spyOn(component, 'onLocationSelected');

      jest.spyOn(component, 'onLocationSelected').mockImplementation(() => {
        component.longitude = 0;
        component.latitude = 0;
      });

      component.onLocationSelected('Hatfield'); 

      expect({longitude: component.longitude, latitude: component.latitude})
      .toEqual({longitude: 0, latitude: 0});

      expect(component.onLocationSelected).toHaveBeenCalled();

    });

    it('should test onLocationSelected functionality [test to see if no event has been passed]', () => {
      jest.spyOn(component, 'onLocationSelected');

      jest.spyOn(component, 'onLocationSelected').mockImplementation(() => {
        component.longitude = 0;
        component.latitude = 0;
      });

      component.onLocationSelected(null); 

      expect({longitude: component.longitude, latitude: component.latitude})
      .not
      .toEqual({longitude: 1, latitude: 1});

      expect(component.onLocationSelected).toHaveBeenCalled();

    });
  });

  /**
   * Test validateNameSurname function
   */
  describe('validateNameSurname', () => {
    it('should succesfully set valid username', () => {
      jest.spyOn(component, 'validateNameSurname');

      expect(component.validateNameSurname(new FormControl('Tester Name')))
      .toEqual(null);

      expect(component.validateNameSurname).toHaveBeenCalled();

    });

    it('should succesfully return error message if invalid name is set', () => {
      jest.spyOn(component, 'validateNameSurname');

      expect(component.validateNameSurname(new FormControl('TesterName123')))
      .toEqual({'error_msg' : 'Name and surname is required'});

      expect(component.validateNameSurname).toHaveBeenCalled();

    });
  });

  /**
   * Test validateEmail function
   */
  describe('validateEmail', () => {
    it('should succesfully set valid email', () => {
      jest.spyOn(component, 'validateEmail');

      expect(component.validateEmail(new FormControl('tester@gmail.com')))
      .toEqual(null);

      expect(component.validateEmail).toHaveBeenCalled();

    });

    it('should succesfully return error message if invalid email is set', () => {	
      jest.spyOn(component, 'validateEmail');

      expect(component.validateEmail(new FormControl('tester')))
      .toEqual({'error_msg' : 'Valid email is required'});

      expect(component.validateEmail).toHaveBeenCalled();

    });

  });

  /**
   * Test validateCellNumber function
   */
  describe('validateCellNumber', () => {
    it('should succesfully set valid cell number', () => {
      jest.spyOn(component, 'validateCellNumber');

      expect(component.validateCellNumber(new FormControl('0123456789')))
      .toEqual(null);

      expect(component.validateCellNumber).toHaveBeenCalled();

    });

    it('should succesfully return error message if invalid cell number is set', () => {
      jest.spyOn(component, 'validateCellNumber');

      expect(component.validateCellNumber(new FormControl('012345678')))
      .toEqual({'error_msg' : 'Valid phone number is required'});

      expect(component.validateCellNumber).toHaveBeenCalled();

    });
  });

  /**
   * Test validateGender function
   */
  describe('validateGender', () => {
    it('should succesfully set valid gender', () => {
      jest.spyOn(component, 'validateGender');

      expect(component.validateGender(new FormControl('M')))
      .toEqual(null);

      expect(component.validateGender(new FormControl('F')))
      .toEqual(null);

      expect(component.validateGender).toHaveBeenCalledTimes(2);

    });

    it('should succesfully return error', () =>  {
      jest.spyOn(component, 'validateGender');

      expect(component.validateGender(new FormControl('N')))
      .toEqual({'error_msg' : 'Valid choice required'});

      expect(component.validateGender).toHaveBeenCalled();
    });

  });


  /**
   * Test validateLocaton function
   */
  describe('validateLocation', () => {

    it('should succesfully set valid location', () => {
      jest.spyOn(component, 'validateLocation');

      expect(component.validateLocation(new FormControl('Hatfield')))
      .toEqual(null);

      expect(component.validateLocation).toHaveBeenCalled();

    });

    it('should succesfully return error', () =>  {
      jest.spyOn(component, 'validateLocation');

      expect(component.validateLocation(new FormControl('')))
      .toEqual({'error_msg' : 'Location is required'});

      expect(component.validateLocation).toHaveBeenCalled();

    });

  });

   


});
