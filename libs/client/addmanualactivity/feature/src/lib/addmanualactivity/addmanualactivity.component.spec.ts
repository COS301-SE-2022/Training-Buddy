import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { Apollo } from 'apollo-angular';
import { AddmanualactivityComponent } from './addmanualactivity.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { 
  ApolloTestingModule,
  ApolloTestingController,
 } from 'apollo-angular/testing';


describe('AddmanualactivityComponent', () => {
  let component: AddmanualactivityComponent;
  let fixture: ComponentFixture<AddmanualactivityComponent>;
  let controller: ApolloTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        UiModule,
        BrowserAnimationsModule,
        ApolloTestingModule,
      ],
      providers: [
        Apollo,
        CookieService
      ],
      declarations: [ AddmanualactivityComponent ]
    })
    .compileComponents();

    controller = TestBed.inject(ApolloTestingController);

  });


  beforeEach(() => {
    fixture = TestBed.createComponent(AddmanualactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  afterEach(() => {
    controller.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test resetForm
   */  
  describe('resetForm', () => {
   it('should reset form', () => {
  
      expect(component.manualForm.value).toEqual({
        name: '',
        type: 'Running',
        hours: '01',
        minutes: '00',
        seconds: '00',
        distance: '',
        date: '',
      });

      component.resetForm();

      expect(component.manualForm.value).toEqual({
        name: null,
        type: null,
        hours: null,
        minutes: null,
        seconds: null,
        distance: null,
        date: null,
      });

    });
  });


  /**
   * Test add function
   */
  describe('add', () => {
    it('should allow user to add activity', () => {
      
      component.add();

      if(component.isWeightLifting)
      {
        const op = controller.expectOne('/graphql');
        expect(op.operation.operationName).toBe('addWeightLiftingActivity');
        op.flush({
          data: {
            addWeightLiftingActivity: {
              name: 'test',
              type: 'WeightLifting',
              date: '2022-10-10',
              email: 'tester@gmail.com',
              weight: 10,
              reps: 10,
              sets: 10
            }
          }
        });
      }
    });
  });

  /**
   * Test ngOnInIt function
   */
  describe('ngOnInIt', () => {
    it('should call ngOnInit function', () => {

      const spy = jest.spyOn(component, 'ngOnInit');
  
      component.ngOnInit();
  
      expect(spy).toHaveBeenCalled();
  
    });
    
  });
 

  /**
   * Test activityToggle function
   */
  describe('activityToggle', () => {
    it('should execute the callback, setting "WeightLifting " to true', () => {
      
        jest.spyOn(component, 'activityToggle');

        component.activityToggle('WeightLifting');

        expect(component.activityToggle).toHaveBeenCalledWith('WeightLifting');

        expect(component.isWeightLifting).toBe(true);

    })
    it('should execute the callback, setting "WeightLifting " to false', () => {
        
          jest.spyOn(component, 'activityToggle');
  
          component.activityToggle('Running');
  
          expect(component.activityToggle).toHaveBeenCalledWith('Running');
  
          expect(component.isWeightLifting).toBe(false);
  
      })
  })

  describe('calculateSeconds', () => {
    it('should successfully calculate seconds', () => {
      const seconds = 30;
      const minutes = 30;
      const hours = 30;

      const expectedValue = (hours * 60 * 60) + (minutes * 60) + seconds;

      expect(component.calulateSeconds(hours, minutes, seconds)).toEqual(expectedValue);

    });

    /**
     * Test with negative values
     */
    // it('should not succesfully calculate seconds', () => {
    //   const seconds = -30;
    //   const minutes = -30;
    //   const hours = -30;

    //   const expectedValue = (hours * 60 * 60) + (minutes * 60) + seconds;

    //   if (seconds < 0 || minutes < 0 || hours < 0 || expectedValue < 0) {
    //     expect(component.calulateSeconds(hours, minutes, hours)).toBeGreaterThanOrEqual(0);
    //   } 
      
    // });

    /**
     * Test calculateSpeed Function
     */
    describe('calculateSpeed', () => {
      let distance, time, expectedValue;

      it('should successfully calculate and return speed', () => {
          distance = 30;
          time = 5

          expectedValue = distance / time;

          expect(component.calculateSpeed(time, distance)).toEqual(expectedValue);

      });

      /**
       * Test with negative values
       */
      // it('should not successfully calculate speed[throw exception]', () => {
      //   distance = -30;
      //   time = 5;

      //   expectedValue = distance / time;

      //   if (expectedValue < 0 || distance < 0 || time < 0) {
      //     expectedValue = expectedValue * -1; 

      //     expect(component.calculateSpeed(time, distance)).toEqual(expectedValue);
        
      //   }      
      // });

    });
  });
});
