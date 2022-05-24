import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StravalinkComponent } from './stravalink.component';

describe('StravalinkComponent', () => {
  let component: StravalinkComponent;
  let fixture: ComponentFixture<StravalinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StravalinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StravalinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
