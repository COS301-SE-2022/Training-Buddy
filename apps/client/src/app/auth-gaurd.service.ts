import { Injectable, Output } from '@angular/core';
import { EventEmitter } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  state = false;
  authStatus = new EventEmitter();

  constructor() { return }

  canActivate() {
    // this.authStatus.emit('event', this.state);
  }

  logIn() {
    this.state = true;
  }

  logOut() {
    this.state = false;
  }

}
