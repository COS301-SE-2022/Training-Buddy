import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { Apollo } from 'apollo-angular';
import { ViewprofilepageComponent } from './viewprofilepage.component';
import { RouterTestingModule } from '@angular/router/testing';
import {CookieService} from 'ngx-cookie-service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
const firebase = {
  apiKey: 'AIzaSyD_61N0OLPsfAKHoawzDtIExK_BU3GR6hM',
  authDomain: 'training-buddy-2022.firebaseapp.com',
  databaseURL: 'https://training-buddy-2022-default-rtdb.firebaseio.com',
  projectId: 'training-buddy-2022',
  storageBucket: 'training-buddy-2022.appspot.com',
  messagingSenderId: '<your-messaging-sender-id>',
  appId: '445917436',
  measurementId: 'G-K7WPZTL3FJ'
}
describe('ViewprofilepageComponent', () => {
  let component: ViewprofilepageComponent;
  let fixture: ComponentFixture<ViewprofilepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        RouterTestingModule
      ],
      declarations: [ ViewprofilepageComponent ],
      providers: [
        Apollo,
        CookieService,
        { provide: FIREBASE_OPTIONS, useValue:firebase }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewprofilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
