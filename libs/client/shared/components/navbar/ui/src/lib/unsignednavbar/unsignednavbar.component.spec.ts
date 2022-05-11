import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiModule } from '../ui.module';

import { UnsignednavbarComponent } from './unsignednavbar.component';

describe('UnsignednavbarComponent', () => {
  let component: UnsignednavbarComponent;
  let fixture: ComponentFixture<UnsignednavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsignednavbarComponent ],
      imports: [
        UiModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsignednavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
