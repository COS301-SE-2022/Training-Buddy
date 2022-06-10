import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'training-buddy-edit-profile',
  templateUrl: './editprofilepage.component.html',
  styleUrls: ['./editprofilepage.component.scss']
})
export class EditprofilepageComponent implements OnInit {
  theUser: user;
  img: string;
  updateForm!: FormGroup;
  frmBuilder! : FormBuilder;

  latitude : number;
  longitude : number;
  vicinity : string;

  constructor(private frm : FormBuilder, private apollo: Apollo) {
    this.theUser= new user("Taku", "Muguti", "taku@gmail.com", "0817653456" ,"Hatfield, Pretoria", "https://images.pexels.com/photos/343717/pexels-photo-343717.jpeg?cs=srgb&dl=pexels-asim-alnamat-343717.jpg&fm=jpg","M");
    this.img = 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80';
    this.latitude = 0;
    this.longitude = 0;
    this.vicinity = "";
    this.frmBuilder = frm;
  }
  ngOnInit(): void {
    //construction of the form
    this.updateForm= this.frmBuilder.group({
      userName: [this.theUser.name , this.validateName],
      userSurname: [this.theUser.surname , this.validateSurname],
      userEmail: [this.theUser.email, this.validateEmail],
      userCellNumber: [this.theUser.cell, this.validateCellNumber],
      userGender: [this.theUser.gender, this.validateGender],
      userLocation: [this.theUser.location, this.validateLocation]
    });
  
  }
  
  //Google geocoding functions
  onAutocompleteSelected(event : any) {
    this.vicinity = event.vicinity;
  }

  onLocationSelected(event: any) {
    //TO be used when moving to co-ordinate based location system.
  
  }

  validateName(input : FormControl) : {[valtype : string] : string} | null {
    const userName = input.value;
    //regex for a length of 3 and a space
    const re = /(([A-Z]|[a-z]))/;
    if (!re.test(userName)) {
      //return error
      return {'error_msg' : 'Name is required'}
    }
    //no error
    return null;
  }
  validateSurname(input : FormControl) : {[valtype : string] : string} | null {
    const userSurname = input.value;
    //regex for a length of 3 and a space
    const re = /(([A-Z]|[a-z]))/;
    if (!re.test(userSurname)) {
      //return error
      return {'error_msg' : 'Surname is required'}
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
  save(){
    console.log('save')
    const oldEmail = this.theUser.email;
    const userName = this.updateForm.controls['userName'].value;
    const userSurname = this.updateForm.controls['userSurname'].value;
    const userEmail = this.updateForm.controls['userEmail'].value;
    const userCellNumber = this.updateForm.controls['userCellNumber'].value;
    const userGender = this.updateForm.controls['userGender'].value;
    const userLocation = this.updateForm.controls['userLocation'].value;

    this.queryAPI(oldEmail,userName,userSurname,userEmail,userCellNumber,userLocation,userGender).then(res=>{
      console.log(res);
    });
  }
  queryAPI(oldemail: string, name: string, surname: string, email: string, cell: string, location: string,  gender: string){
    return new Promise((resolve, )=>{
      if(!this.apollo.client === undefined){
        this.apollo
          .mutate({
            mutation: gql`
                mutation{
                updateProfile(userDto: {
                  oldemail: "${oldemail}",
                  userName: "${name}",
                  userSurname: "${surname}",
                  location: "${location}",
                  gender: "${gender}",
                  email: "${email}",
                  cellNumber: "${cell}",
              }){
                message
              }
            }
          `,
          })
          .subscribe ((result) => {
            resolve(result);
          });
      }
    })
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