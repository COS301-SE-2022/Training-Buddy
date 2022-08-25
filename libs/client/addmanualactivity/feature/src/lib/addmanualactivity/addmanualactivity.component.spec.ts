import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { Apollo } from 'apollo-angular';
import { AddmanualactivityComponent } from './addmanualactivity.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';


describe('AddmanualactivityComponent', () => {
  let component: AddmanualactivityComponent;
  let fixture: ComponentFixture<AddmanualactivityComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        UiModule,
        BrowserAnimationsModule
      ],
      providers: [
        Apollo,
        CookieService
      ],
      declarations: [ AddmanualactivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmanualactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
