import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StravaAPIService } from '../services/strava-api.service';

@Component({
  selector: 'training-buddy-strava-exchangetoken',
  templateUrl: './stravaexchangetoken.component.html',
  styleUrls: ['./stravaexchangetoken.component.scss']
})
export class StravaexchangetokenComponent implements OnInit {

  constructor(private strava : StravaAPIService, private activeRoute : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.strava.setOAuthResponse(params);
      this.router.navigate(['strava/link']);
    });
  }

}
