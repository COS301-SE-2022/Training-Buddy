import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StravaAPIService } from './strava-api.service';
import { Apollo } from 'apollo-angular';

describe('StravaAPIService', () => {
  
  let service: StravaAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule

      ],
      providers: [
        HttpClient,
        Apollo
      ]
    });
    service = TestBed.inject(StravaAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
