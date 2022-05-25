import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StravaAPIService } from '../services/strava-api.service';

@Component({
  selector: 'training-buddy-strava-link',
  templateUrl: './stravalink.component.html',
  styleUrls: ['./stravalink.component.scss']
})
export class StravalinkComponent implements OnInit {

  img : string

  OAuthError : boolean;
  loading : boolean;

  constructor(private router : Router, private strava : StravaAPIService) {
    this.img = 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80';
    this.OAuthError = false;
    if (this.strava.isOAuthValid() == false) {
      this.OAuthError = true;
    }
    this.loading = this.strava.isLoading();
  }

  ngOnInit(): void {
    console.log();
  }

  LinkToStrava() {
    //user wants to link strava now
    this.strava.OAuthPage();
  }

  NoLinking() {
    //user does not want to link strava
    this.router.navigate(['dashboard']);
  }

}
