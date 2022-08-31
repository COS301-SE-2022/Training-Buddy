import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor() { }

  canActivate() {
    console.log('in auth gaurd');
    return true;
  }

}
