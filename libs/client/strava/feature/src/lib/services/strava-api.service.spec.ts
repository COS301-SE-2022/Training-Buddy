import { TestBed } from '@angular/core/testing';

import { StravaAPIService } from './strava-api.service';

describe('StravaAPIService', () => {
  let service: StravaAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StravaAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
