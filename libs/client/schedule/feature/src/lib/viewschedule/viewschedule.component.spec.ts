import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewscheduleComponent } from './viewschedule.component';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';

describe('ViewscheduleComponent', () => {
  let component: ViewscheduleComponent;
  let fixture: ComponentFixture<ViewscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewscheduleComponent ],
      imports:[
        ReactiveFormsModule,
        UiModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        Apollo, 
        CookieService
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
