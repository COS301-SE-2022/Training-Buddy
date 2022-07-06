import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { UploadprofileimageComponent } from './uploadprofileimage.component';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';

describe('UploadprofileimageComponent', () => {
  let component: UploadprofileimageComponent;
  let fixture: ComponentFixture<UploadprofileimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadprofileimageComponent ],
      imports: [
        ReactiveFormsModule,
        UiModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        Apollo,
        CookieService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadprofileimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
