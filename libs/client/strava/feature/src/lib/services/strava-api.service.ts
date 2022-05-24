import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StravaAPIService {

  client_id = '85093';
  client_secret = 'a104b3a3699b54450312f26698167e28b61d5624';
  grant_type = 'authorization_token';

  OAuthURI = `http://www.strava.com/oauth/authorize?client_id=${this.client_id}&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all`;

  userToken : any;

  OAuth : any;

  complete : boolean;

  constructor() { 
    this.OAuth = null;
    this.complete = false;
  }

  OAuthPage() {
    location.href = this.OAuthURI;
  }

  setOAuthResponse(params : any) {
    this.OAuth = params;
    if (!this.isOAuthValid()) {
      console.log('not valid OAuth');
      return;
    }
    //OAuth is valid
    console.log('valid OAuth');
  }

  getUserToken() {

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

  logOAuth() {
    console.log(this.OAuth);
  }

  isComplete() : boolean {
    return false;
  }

}
