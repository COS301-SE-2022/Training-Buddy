import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { StravalinkComponent } from './stravalink.component';
import { Apollo } from 'apollo-angular';

describe('StravalinkComponent', () => {
  let component: StravalinkComponent;
  let fixture: ComponentFixture<StravalinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StravalinkComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        UiModule
      ],
      providers: [
        HttpClient,
        Apollo
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StravalinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
