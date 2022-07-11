import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuddylistComponent } from './buddylist.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Apollo } from 'apollo-angular';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BuddylistComponent', () => {
  let component: BuddylistComponent;
  let fixture: ComponentFixture<BuddylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuddylistComponent ],
      imports: [
        UiModule,
        RouterTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
      providers: [
        Apollo,
        CookieService
      ]
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
