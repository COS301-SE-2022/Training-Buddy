import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'training-buddy-edit-profile',
  templateUrl: './editprofilepage.component.html',
  styleUrls: ['./editprofilepage.component.scss']
})
export class EditprofilepageComponent implements OnInit {

  user!: any;
  updateForm!: FormGroup;
  frmBuilder! : FormBuilder;
  vicinity = '';
  longitude = 0;
  latitude = 0;

  constructor(private frm : FormBuilder, private apollo: Apollo, private cookie: CookieService) {

  }

  ngOnInit(): void {
    //construction of the form
    this.getCurrentUser().subscribe({
      next: (data: any) => {
        this.updateForm= this.frmBuilder.group({
          userNameSurname: [`${this.user.name} ${this.user.surname}`, this.validateNameSurname],
          userEmail: [this.user.email, this.validateEmail],
          userCellNumber: [this.user.cell, this.validateCellNumber],
          userGender: [this.user.gender, this.validateGender],
          userLocation: [this.user.location, this.validateLocation]
        });
      }
    })
  }

  getCurrentUser() {
    return this.apollo.watchQuery({
      query: gql`query{
        getOne(
          email: "${this.cookie.get('email')}",
      ){
        userName,
        userSurname,
        location,
        dob,
        gender,
        email,
        cellNumber,
        bio,
        metrics{lift , ride , run , swim},
        buddies
      }
      }`
    }).valueChanges
  }
  
  //Google geocoding functions
  onAutocompleteSelected(event : any) {
    this.vicinity = event.vicinity;
  }

  onLocationSelected(event: any) {
    if (event != null) {
      this.latitude = event.latitude;
      this.longitude = event.longitude;
    }
  }

  //userNameSurname
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
    const oldEmail = this.email;
    const userName = this.updateForm.controls['userName'].value;
    const userSurname = this.updateForm.controls['userSurname'].value;
    const userEmail = this.updateForm.controls['userEmail'].value;
    const userCellNumber = this.updateForm.controls['userCellNumber'].value;
    const userGender = this.updateForm.controls['userGender'].value;
    const userLocation = this.updateForm.controls['userLocation'].value;

    this.queryAPI(this.email,userName,userSurname,userEmail,userCellNumber,userLocation,userGender).then(res=>{
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