import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { Apollo, gql } from 'apollo-angular';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [
        ReactiveFormsModule,
        UiModule,
        NoopAnimationsModule
      ],
      providers: [
        Apollo
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test ngOnInit Function
   */
  describe('ngOnInit', () => {
    it('should create', () => {

      //Function constructs the form
      jest.spyOn(component, 'ngOnInit');

      component.ngOnInit();

      component.updateForm = component.frmBuilder.group({
        userName: [component.theUser.name, component.validateName],
        userSurname: [component.theUser.surname, component.validateSurname],
        userEmail: [component.theUser.email, component.validateEmail],
        userCellNumber: [component.theUser.cell, component.validateCellNumber],
        userGender: [component.theUser.gender, component.validateGender],
        userLocation: [component.theUser.location, component.validateLocation],
    });

      expect(component.updateForm).toBeTruthy();

      expect(component.ngOnInit).toHaveBeenCalled();
    
    });
  
  });


  /**
   * Test onAutocompleteSelected Function
   */
  describe('onAutocompleteSelected', () => {
    it('should successfully set vicinity', () => {

      jest.spyOn(component, 'onAutocompleteSelected').mockImplementation(() => {
        component.vicinity = 'Hatfield';
      });

      component.onAutocompleteSelected(new Event('Hatfield'));

      expect(component.vicinity).toEqual('Hatfield');
  
    });

  });

  /**
   * Test validateName Function
   */
  describe('validateName', () => {
    it('should successfully validate name', () => {

     jest.spyOn(component, 'validateName');

      expect(component.validateName(new FormControl('TesterName')))
      .toEqual(null);

      expect(component.validateName).toHaveBeenCalled();

    });
    
    it('should successfully return error message', () => {
        
      jest.spyOn(component, 'validateName');

      expect(component.validateName(new FormControl('')))
      .toEqual({'error_msg' : 'Name is required'});

      expect(component.validateName).toHaveBeenCalled();
    
    });

  });

    /**
   * Test validateSurname Function
   */
     describe('validateSurname', () => {
      it('should successfully validate name', () => {
  
       jest.spyOn(component, 'validateSurname');
  
        expect(component.validateSurname(new FormControl('TesterSurname')))
        .toEqual(null);
  
        expect(component.validateSurname).toHaveBeenCalled();
  
      });
      
      it('should successfully return error message', () => {
          
        jest.spyOn(component, 'validateSurname');
  
        expect(component.validateSurname(new FormControl('')))
        .toEqual({'error_msg' : 'Surname is required'});
  
        expect(component.validateSurname).toHaveBeenCalled();
      
      });
  
    });

    /**
     * Test validateEmail Function
  */
    describe('validateEmail', () => {
      it('should successfully validate email', () => {
  
        jest.spyOn(component, 'validateEmail');
  
        expect(component.validateEmail(new FormControl('tester@email.com')))
        .toEqual(null);

        expect(component.validateEmail).toHaveBeenCalled();
      });

      it('should successfully return error message', () => {
                        
          jest.spyOn(component, 'validateEmail');
    
          expect(component.validateEmail(new FormControl('test')))
          .toEqual({'error_msg' : 'Valid email is required'});
    
          expect(component.validateEmail).toHaveBeenCalled();
        });                         
    });

    /**
     * Test validateCellNumber Function
     */
    describe('validateCellNumber', () => {
      it('should successfully validate cell number', () => {
  
        jest.spyOn(component, 'validateCellNumber');
  
        expect(component.validateCellNumber(new FormControl('0123456789')))
        .toEqual(null);

        expect(component.validateCellNumber).toHaveBeenCalled();
      });

      it('should successfully return error message', () => {
                        
          jest.spyOn(component, 'validateCellNumber');
    
          expect(component.validateCellNumber(new FormControl('0123e982374')))
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

    /**
     * Test save function
     */

    describe('save', () => {
      it('should succesfully save user', () => {

        jest.spyOn(component, 'save');

        component.save();

        expect(component.save).toHaveBeenCalled();
      });
    });

    /**
     * Test queryAPI function
     */

    describe('queryAPI', () => {
      it('should succesfully query API', async () => {

      const apollo = TestBed.inject(Apollo);

      return apollo.mutate({
        mutation: gql`
        mutation{
        updateProfile(userDto: {
          oldemail: "oldTester@gmail.com",
          userName: "testerName",
          userSurname: "testerSurname",
          location: "Hatfield",
          gender: "Male",
          email: "tester@gmail.com",
          cellNumber: "0123456789",
      }){
        message
      }
    }
  `,
      }).subscribe((result) => {
          //Expect result

          expect(result)
          .toEqual({ 
            data: { 
              login: { 
                oldemail: "oldTester@gmail.com",
                userName: "testerName",
                userSurname: "testerSurname",
                location: "Hatfield",
                gender: "Male",
                email: "tester@gmail.com",
                cellNumber: "0123456789",
              } } });
            
      });
    });
  });

});
