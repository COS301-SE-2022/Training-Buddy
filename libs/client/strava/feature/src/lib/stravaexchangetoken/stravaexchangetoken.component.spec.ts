import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Apollo } from 'apollo-angular';
import { StravaexchangetokenComponent } from './stravaexchangetoken.component';

describe('StravaexchangetokenComponent', () => {
  let component: StravaexchangetokenComponent;
  let fixture: ComponentFixture<StravaexchangetokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StravaexchangetokenComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        HttpClient,
        Apollo
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StravaexchangetokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
