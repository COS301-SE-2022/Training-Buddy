import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { Apollo } from 'apollo-angular';
import { ScheduleworkoutComponent } from './scheduleworkout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';

describe('ScheduleworkoutComponent', () => {
  let component: ScheduleworkoutComponent;
  let fixture: ComponentFixture<ScheduleworkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleworkoutComponent ],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        UiModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        Apollo,
        CookieService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleworkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
