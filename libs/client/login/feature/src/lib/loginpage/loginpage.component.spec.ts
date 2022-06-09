import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginpageComponent } from './loginpage.component';
import { Apollo } from 'apollo-angular';
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
        RouterTestingModule
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
});
