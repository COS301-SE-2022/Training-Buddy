import { Injectable, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  state = false;
  authStatus = new EventEmitter();

  constructor() { return }

  canActivate() {
    this.authStatus.emit(this.state);
  }

  logIn() {
    this.state = true;
  }

  logOut() {
    this.state = false;
  }

}
