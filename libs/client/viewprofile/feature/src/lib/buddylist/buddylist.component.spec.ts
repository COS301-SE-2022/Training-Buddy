import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddylistComponent } from './buddylist.component';

describe('BuddylistComponent', () => {
  let component: BuddylistComponent;
  let fixture: ComponentFixture<BuddylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuddylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuddylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
