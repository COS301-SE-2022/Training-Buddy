import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { Apollo } from 'apollo-angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AthleteprofileComponent } from './athleteprofile.component';

describe('AthleteprofileComponent', () => {
  let component: AthleteprofileComponent;
  let fixture: ComponentFixture<AthleteprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AthleteprofileComponent ],
      imports: [
        ReactiveFormsModule,
        UiModule,
        NoopAnimationsModule
      ],
      providers: [
        Apollo,
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
