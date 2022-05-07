import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'training-buddy-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;

  constructor() { }

  ngOnInit(): void {
  }

  signup() {
    alert('register');
  }

}
