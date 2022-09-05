import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import firebase = require('firebase/compat');

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        ReactiveFormsModule,
        UiModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        Apollo,
        CookieService,
        { provide: FIREBASE_OPTIONS, useValue:firebase }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
