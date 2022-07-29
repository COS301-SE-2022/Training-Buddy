import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { WorkoutInviteComponent } from './workout-invite.component';

describe('WorkoutInviteComponent', () => {
  let component: WorkoutInviteComponent;
  let fixture: ComponentFixture<WorkoutInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutInviteComponent ],
      imports: [
        UiModule,
        MatDialogModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        Apollo,
        CookieService,
        { 
          provide: MatDialogRef,
          useValue: []
        }, 
        { 
          provide: MAT_DIALOG_DATA, 
          useValue: [], 
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
