import { Injectable, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  state = false;
  authStatus = new EventEmitter();

  constructor(private router : Router) { }

  canActivate() {
    if (this.state == false) {
      this.router.navigate(['/login']);
    }
  }

  logIn() {
    this.state = true;
  }

  logOut() {
    this.state = false;
  }

}
