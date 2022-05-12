import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteprofileComponent } from './athleteprofile.component';

describe('AthleteprofileComponent', () => {
  let component: AthleteprofileComponent;
  let fixture: ComponentFixture<AthleteprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AthleteprofileComponent ]
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
