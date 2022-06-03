import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleworkoutComponent } from './scheduleworkout.component';

describe('ScheduleworkoutComponent', () => {
  let component: ScheduleworkoutComponent;
  let fixture: ComponentFixture<ScheduleworkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleworkoutComponent ]
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
