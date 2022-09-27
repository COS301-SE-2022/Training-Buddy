import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
// import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FeatureModule as ClientShellFeatureModule } from '@training-buddy/client/shell/feature';
import { AuthGaurdService } from './auth-guard.service';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ClientShellFeatureModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it(`should have as title 'client'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('client');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain(
  //     'Welcome client'
  //   );
  // });

  /**
   * Test constructor
   */
  describe('constructor', () => {
    it('should subscribe to authStatus', () => {
      const fixture = TestBed.createComponent(AppComponent);

      const auth = TestBed.inject(AuthGaurdService);

      const router = TestBed.inject(Router);

      auth.authStatus.subscribe((val) => {
        if (!val) {
          router.navigate(['/login']);

          expect(router.navigate).toHaveBeenCalledWith(['/login']);
        }
      });

      expect(auth.authStatus).toBeTruthy();
    });
  });



  /**
   * Test can activate function
   */
  describe('canActivate', () => {
    it('should return router login', () => {

      const auth = TestBed.inject(AuthGaurdService);
      const router: Router = TestBed.inject(Router);
      let result = router.navigate(['/']);

      auth.state = false; 
      
      auth.canActivate();

      expect(result).toEqual(router.navigate(['/login']));

    });
  });

  /**
   * Test logIn function
   */
  describe('logIn', () => {
    it('should return true', () => {

      const auth = TestBed.inject(AuthGaurdService);

      auth.state = false;

      auth.logIn();

      expect(auth.state).toEqual(true);


    });
  });

  /**
   * Test logOut function
   */
  describe('logOut', () => {
    it('should return false', () => {

      const auth = TestBed.inject(AuthGaurdService);

      auth.state = true;

      auth.logOut();

      expect(auth.state).toEqual(false);

    });
  });

});
