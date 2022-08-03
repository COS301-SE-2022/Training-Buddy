import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { Apollo } from 'apollo-angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AthleteprofileComponent } from './athleteprofile.component';
import { CookieService } from 'ngx-cookie-service';


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
});
