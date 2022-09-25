import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { Apollo } from 'apollo-angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AthleteprofileComponent } from './athleteprofile.component';
import { CookieService } from 'ngx-cookie-service';
import { 
  ApolloTestingModule,
 } from 'apollo-angular/testing';


describe('AthleteprofileComponent', () => {
  let component: AthleteprofileComponent;
  let fixture: ComponentFixture<AthleteprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AthleteprofileComponent ],
      imports: [
        ReactiveFormsModule,
        UiModule,
        NoopAnimationsModule,
        RouterTestingModule,
        ApolloTestingModule,
       
      ],
      providers: [
        Apollo,
        CookieService,
      ]
    })
    .compileComponents();



  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
   * Test getCurrentUser function
   */
  describe('getCurrentUser', () => {
    it('should call getCurrentUser function', () => {

      const spy = jest.spyOn(component, 'getCurrentUser');
  
      component.getCurrentUser().subscribe();

      const op = component.getCurrentUser().subscribe();
      op.add(() => {
        expect(component.getCurrentUser).toEqual({
          userName: 'Tester',
          userSurname: 'TesterSurname',
          location: 'Hatfield',
          longitude: 1,
          latitude: 1,
          stravaToken: '123456789',
          dob: '1990-01-01',
          gender: 'male',
          email: 'tester@gmail.com',	
          cellNumber: '0812634568',
          bio: 'I love to run and write software',
          metrics: { lift: 1, ride: 1, run: 1, swim: 1 },
          buddies: [],
          distance: 10,
          });
      });

      expect(spy).toHaveBeenCalled();

    });
  });

  /**
   * Test update error function
   */
  describe('updateError', () => {
    it('should call updateError function', () => {

      const spy = jest.spyOn(component, 'updateError');
  
      component.updateError();

      expect(spy).toHaveBeenCalled();

    });
  });

  /**
   * Test save Function
   */
  describe('save', () => {
    it('should call save function', () => {

      const spy = jest.spyOn(component, 'save');

      component.save();

      
      if(component.update){

        component.updateProfile('tester', true, false, false, false,'', 10);
        expect(component.update).toEqual(true);
        
      }

      component.setProfile('tester','', 10);
      expect(component.update).toEqual(false);

      expect(spy).toHaveBeenCalled();

    });
  });


  /**
   * Test setProfile Function
   */
  describe('setProfile', () => {
    it('should call setProfile function', () => {

      const spy = jest.spyOn(component, 'setProfile');

      const op = component.setProfile('tester', '', 10).subscribe();
      op.add(() => {
        expect(component.setProfile).toEqual({
          userConfig: {
            email: 'tester@gmail.com',	
            distance: 10,
            riding: 1.4,
            running: 2.5,
            swimming: 1.2,
            lifting: 1.3,
            bio: '',
            },
          });
      });

      expect(spy).toHaveBeenCalled();

    });
  });
});
