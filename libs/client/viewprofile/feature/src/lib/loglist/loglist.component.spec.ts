import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoglistComponent } from './loglist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { Apollo } from 'apollo-angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';

describe('LoglistComponent', () => {
  let component: LoglistComponent;
  let fixture: ComponentFixture<LoglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoglistComponent ],
      imports: [
        ReactiveFormsModule,
        UiModule,
        NoopAnimationsModule,
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
    fixture = TestBed.createComponent(LoglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
