import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { WorkoutInviteComponent } from './workout-invite.component';

describe('WorkoutInviteComponent', () => {
  let component: WorkoutInviteComponent;
  let fixture: ComponentFixture<WorkoutInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutInviteComponent ],
      providers: [
        Apollo,
        CookieService,
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
