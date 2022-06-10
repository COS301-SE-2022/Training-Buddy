import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inject } from '@nestjs/common';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StravaAPIService {

  client_id = '85093';
  client_secret = 'a104b3a3699b54450312f26698167e28b61d5624';
  grant_type = 'authorization_code';

  OAuthURI = `http://www.strava.com/oauth/authorize?client_id=${this.client_id}&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all`;

  userToken : any;

  OAuth : any;

  loading : boolean;

  constructor(private http : HttpClient, private apollo : Apollo, private router : Router) { 
    this.OAuth = null;
    this.userToken = null;
    this.loading = false;
  }

  OAuthPage() {
    location.href = this.OAuthURI;
  }

  setOAuthResponse(params : any) {
    this.OAuth = params;
    if (!this.isOAuthValid()) {
      return;
    }
    //OAuth is valid
    this.loading = true;
    this.getUserToken();
  }

  getUserToken() {

    this.loading = true;

    const params = new HttpParams()
    .set('client_id', this.client_id)
    .set('client_secret', this.client_secret)
    .set('code', this.OAuth.code)
    .set('grant_type', this.grant_type)

    this.http.post<any>('https://www.strava.com/oauth/token', params).subscribe(
      {
        next: data => {
          this.userToken = data;
          console.log(data);

          ////////////
          //API call to add users refresh token to the user goes here:
          console.log('To store: ' + this.userToken.refresh_token);
          //
          ///////////

          this.getActivities();
        },
        error: err => {
          this.userToken = null;
        }
      }
    )

  }

  getActivities() {

    //NOTE the per_page is used to regulate the size of pages returned in an array of arrays of 100 objects:
    //i.e. 200 activities = [ [ 0 - 99 ] , [ 100 - 199 ] ]

    //Api calls can be made for specific acitivity types in the future if required
    //to get after a date add ?after=x as a parameter where x=a epoch timestamp to return all activities after the date x.

    this.http.get('https://www.strava.com/api/v3/athlete/activities?per_page=10&access_token=' + this.userToken.access_token).subscribe(
      {
        next: (data : any) => {

          let count = 0;
          data.map((el : any) => {
            this.sendActivity(el).subscribe(
              {
                next: (data : any) => {
                  count++;
                  if (count == 30)
                    this.router.navigate(['dashboard']);
                }
              }
            )
          })

        },
        error: err => {
          console.log(err);
        }
      }
    )
  }

  isOAuthValid() : boolean | null {
    if (this.OAuth == null) {
      return null;
    }
    if (this.OAuth['error']) {
      return false;
    }
    return true;
  }

  isTokenValid() : boolean {
    if (this.userToken == null) 
      return false;
    return true;
  }

  logOAuth() : any {
    console.log(this.OAuth);
  }

  logUserToken() : any {
    console.log(this.userToken);
  }

  isLoading() : boolean {
    return this.loading;
  }

  sendActivity(data : any) {

    const email = 'muziwandile@gmail.com';
    return this.apollo
      .mutate({
        mutation: gql`mutation{
          activityLog(Activitylog: {
            name: "${data.name}",
            distance: ${data.distance},
            speed: ${data.average_speed},
            time: ${data.moving_time},
            dateCompleted: "${data.start_date}",
            activityType: "${data.sport_type}",
            email: "${email}",
        }){
          message
        }
        }
         
        `,
      });
  }

}
