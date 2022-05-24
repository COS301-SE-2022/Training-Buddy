import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StravaexchangetokenComponent } from './stravaexchangetoken.component';

describe('StravaexchangetokenComponent', () => {
  let component: StravaexchangetokenComponent;
  let fixture: ComponentFixture<StravaexchangetokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StravaexchangetokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StravaexchangetokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
