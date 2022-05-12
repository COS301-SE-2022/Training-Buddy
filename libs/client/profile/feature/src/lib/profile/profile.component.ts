import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'training-buddy-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  theUser: user;
  img: string;
  updateForm!: FormGroup;
  frmBuilder! : FormBuilder;

  latitude : number;
  longitude : number;
  vicinity : string;

  constructor(private frm : FormBuilder) {
    this.theUser= new user("Taku", "Muguti", "taku@gmail.com", "0817653456" ,"Hatfield, Pretoria", "https://images.pexels.com/photos/343717/pexels-photo-343717.jpeg?cs=srgb&dl=pexels-asim-alnamat-343717.jpg&fm=jpg","Male");
    this.img = 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80';
    this.latitude = 0;
    this.longitude = 0;
    this.vicinity = "";
    this.frmBuilder = frm;
  }
  ngOnInit(): void {
    //construction of the form
    this.updateForm= this.frmBuilder.group({
      userName: [this.theUser.name , this.validateNameSurname],
      userSurname: [this.theUser.surname , this.validateNameSurname],
      userEmail: [this.theUser.email, this.validateEmail],
      userCellNumber: [this.theUser.cell, this.validateCellNumber],
      userGender: [this.theUser.gender, this.validateGender],
      userLocation: [this.theUser.location, this.validateLocation]
    });
  
  }
     /////////////////////////////////////////////////////////////////
  //Google geocoding functions
  onAutocompleteSelected(event : any) {
    this.vicinity = event.vicinity;
  }

  onLocationSelected(event: any) {
    //TO be used when moving to co-ordinate based location system.
    // console.log(event);
    // if (event != null) {
    //   this.latitude = event.latitude;
    //   this.longitude = event.longitude;
    // }
  }

  validateNameSurname(input : FormControl) : {[valtype : string] : string} | null {
    const userNameSurname = input.value;
    //regex for a length of 3 and a space
    const re = /(([A-Z]|[a-z]))+ ([A-Z]|([a-z]))+/;
    if (!re.test(userNameSurname)) {
      //return error
      return {'error_msg' : 'Name and surname is required'}
    }
    //no error
    return null;
  }

  //userEmail
  validateEmail(input : FormControl) : {[valtype : string] : string} | null {
    const userEmail = input.value;
    //regex for email from RFC 5322 standards
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(userEmail)) {
      //return error
      return {'error_msg' : 'Valid email is required'}
    }
    //no error
    return null;
  }

  //userCellNumber
  validateCellNumber(input : FormControl) : {[valtype : string] : string} | null {
    const val = input.value;
    //remove spaces:
    const userCellNumber = val.replace(/ /g, '');
    //regex for a phone number (length of 10, )
    const re = /^[0-9]{10,10}$/;
    if (!re.test(userCellNumber)) {
      //return error
      return {'error_msg' : 'Valid phone number is required'}
    }
    //no error
    return null;
  }

  validateGender(input : FormControl) : {[valtype : string] : string} | null {
    const userGender = input.value;
    //regex for M or F
    const re = /[M]|[F]/;
    if (!re.test(userGender)) {
      return {'error_msg' : 'Valid choice required'}
    }
    //no error
    return null;
  }

  validateLocation(input : FormControl) : {[valtype : string] : string} | null {
    const userLocation = input.value;
    //check for not null
    if (userLocation.length == 0) {
      return {'error_msg' : 'Location is required'}
    }
    //no error
    return null;
  }
}

export class user{
  name: string;
  surname: string;
  location: string;
  image: string;
  gender: string;
  email: string;  
  cell: string;

  constructor(name: string, surname: string, email: string, cell: string, location: string, image: string,  gender: string){
    this.name = name;
    this.surname = surname;
    this.location = location;
    this.image = image;
    this.gender = gender;
    this.email = email;
    this.cell = cell;
  }

}



