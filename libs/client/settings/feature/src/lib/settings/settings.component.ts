import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'training-buddy-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  img : string;
  theUser: user;
  constructor() { 
    this.img = 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80';
    this.theUser= new user("Taku", "Muguti", "Hatfield, Pretoria", "https://images.pexels.com/photos/343717/pexels-photo-343717.jpeg?cs=srgb&dl=pexels-asim-alnamat-343717.jpg&fm=jpg","Running is life.");

  }

  ngOnInit(): void {
    console.log('')
  }

}

export class user{
  name: string;
  surname: string;
  location: string;
  image: string;
  status: string;

  constructor(name: string, surname: string, location: string, image: string, status: string){
    this.name = name;
    this.surname = surname;
    this.location = location;
    this.image = image;
    this.status = status;
  }
}
