import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'training-buddy-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {

  img : string;

  constructor() {

    this.img = 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';
   
  }

  ngOnInit(): void {
    return;
  }

  login() {
    alert('login');
  }

  register() {
    alert('register');
  }

}
