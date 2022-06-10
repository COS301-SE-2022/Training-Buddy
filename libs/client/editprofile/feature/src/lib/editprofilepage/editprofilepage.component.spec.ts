import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EditprofilepageComponent } from './editprofilepage.component';
import { Apollo } from 'apollo-angular';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';

describe('EditprofilepageComponent', () => {
  let component: EditprofilepageComponent;
  let fixture: ComponentFixture<EditprofilepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        RouterTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        Apollo,
        CookieService
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
