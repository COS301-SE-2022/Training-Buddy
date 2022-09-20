import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inject } from '@nestjs/common';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(private http : HttpClient, private apollo : Apollo, private router : Router, private cookie : CookieService) { 
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
          
          const access = this.userToken.access_token; //used to query the API
          const refresh = this.userToken.refresh_token; //used to get a access_token
          const exp = this.userToken.expires_at; //used to show expiry of the access_token
          const clientId = this.client_id ;
          const clientSecret = this.client_secret ;

          this.sendTokens(access, refresh, exp, clientId, clientSecret).subscribe({
            next: data => {
              console.log(data);
              //redirect to the login
              this.router.navigate(['dashboard']);
            },
            error: err => {
              //push error to page here
            }
          });
          
          //this.getActivities();

        },
        error: (err : any) => {
          this.userToken = null;
        }
      }
    )

  }

  sendTokens(access: string, refresh: string, exp : number, clientId : string, clientSecret : string) {
    return this.apollo
      .mutate({
        mutation: gql`mutation{
          saveTokens(
            email: "${this.cookie.get('email')}",
            access: "${access}",
            refresh: "${refresh}",
            exp: ${Number(exp)},
            clientId: "${clientId}",
            clientSecret: "${clientSecret}"
        ){
          message
        }
        }
        `,
      });
  }

  getActivities() {
    this.http.get('https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=' + this.userToken.access_token).subscribe(
      {
        next: data => {
          console.log(data);
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

}
