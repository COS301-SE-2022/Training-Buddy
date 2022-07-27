import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { Apollo } from 'apollo-angular';
import firebase = require('firebase/compat');
import { CookieService } from 'ngx-cookie-service';

import { WorkoutComponent } from './workout.component';

describe('WorkoutComponent', () => {
  let component: WorkoutComponent;
  let fixture: ComponentFixture<WorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutComponent ],
      imports: [
        UiModule,
        RouterTestingModule
      ],
      providers: [
        Apollo,
        CookieService,
        { provide: FIREBASE_OPTIONS, useValue:firebase }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
