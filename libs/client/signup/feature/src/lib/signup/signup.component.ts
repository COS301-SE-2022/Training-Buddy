import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'training-buddy-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide : boolean;
  img : string;

  constructor() {
    this.hide = true;
    this.img = 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';
  }

  ngOnInit(): void {
    return;
  }

  signup() {
    alert('register');
  }

  /////////////////////////////////////////////////////////////////
  //Google geocoding functions

  //this function will log a comprehensive result from the search.
  onAutocompleteSelected(event : any) {
    console.log('22');
    console.log(event);
  }

  //this function will just recieve the long and lat of the search query result.
  onLocationSelected(event: any) {
    const latitude = event.latitude;
    const longitude = event.longitude;
    console.log(`latitude: ${latitude}, longitude: ${longitude}`);
  }

  /////////////////////////////////////////////////////////////////

}
