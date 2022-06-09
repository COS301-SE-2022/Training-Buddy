import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StravaAPIService } from './strava-api.service';

describe('StravaAPIService', () => {
  
  let service: StravaAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule

      ],
      providers: [
        HttpClient
      ]
    });
    service = TestBed.inject(StravaAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
