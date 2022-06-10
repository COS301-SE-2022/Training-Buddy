import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { Apollo } from 'apollo-angular';
import { ViewprofilepageComponent } from './viewprofilepage.component';
import { RouterTestingModule } from '@angular/router/testing';
import {CookieService} from 'ngx-cookie-service';

describe('ViewprofilepageComponent', () => {
  let component: ViewprofilepageComponent;
  let fixture: ComponentFixture<ViewprofilepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        RouterTestingModule
      ],
      declarations: [ ViewprofilepageComponent ],
      providers: [
        Apollo,
        CookieService
      ],
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
