import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EditprofilepageComponent } from './editprofilepage.component';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';

describe('EditprofilepageComponent', () => {
  let component: EditprofilepageComponent;
  let fixture: ComponentFixture<EditprofilepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        RouterTestingModule
      ],
      declarations: [ EditprofilepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprofilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
