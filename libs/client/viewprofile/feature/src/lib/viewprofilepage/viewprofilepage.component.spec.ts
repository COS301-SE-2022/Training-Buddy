import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewprofilepageComponent } from './viewprofilepage.component';

describe('ViewprofilepageComponent', () => {
  let component: ViewprofilepageComponent;
  let fixture: ComponentFixture<ViewprofilepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewprofilepageComponent ]
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
