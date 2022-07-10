import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoglistComponent } from './loglist.component';

describe('LoglistComponent', () => {
  let component: LoglistComponent;
  let fixture: ComponentFixture<LoglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
