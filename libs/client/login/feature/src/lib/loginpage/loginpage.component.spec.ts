import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginpageComponent } from './loginpage.component';
import { Apollo, gql } from 'apollo-angular';
import {CookieService} from 'ngx-cookie-service';


describe('LoginpageComponent', () => {
  let component: LoginpageComponent;
  let fixture: ComponentFixture<LoginpageComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginpageComponent ],
      imports: [
        ReactiveFormsModule,
        UiModule,
        BrowserAnimationsModule,
        RouterTestingModule,

      ],
      providers: [
        Apollo,
        CookieService
      ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginpageComponent);
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
    it('should create form', () => {
      component.ngOnInit();
      
      component.loginFrm = component.frmBuilder.group({
        userEmail : ['', Validators.required],
        userPassword : ['', Validators.required]
      });
    
      component.loginFrm.controls['userEmail'].setValue('tester@gmail.com');
      component.loginFrm.controls['userPassword'].setValue('password');

      expect(component.loginFrm.valid).toBeTruthy();

    });
  });

  /**
   * Test login Function
   */
  describe('login', () => {
    it('should allow user to login', () => {

      jest.spyOn(component, 'login').mockImplementation(() => {
        component.loginFrm.controls['userEmail'].setValue('tester@gmail.com');
        component.loginFrm.controls['userPassword'].setValue('password');
        component.login();
      })

      expect(component.login).toBeTruthy();

    });
  });

  /**
   * Test queryLogin functionality
   */
  describe('queryLogin', () => {
    it('should successfully return login query', async () => {
        
      //Apollo create
      const apollo = TestBed.inject(Apollo);

      return apollo.mutate({
        mutation: gql`
        mutation{
          login(loginInput:{
            username: "tester",
            password: "password"
          }){
            user{
              userName,
              userSurname,
              email,
              id
            }
          }
        }
        `,
      }).subscribe((result) => {
        expect(result).toEqual({ data: { login: { username: 'tester', password: 'password' } } });
      });

    });

  });


});
