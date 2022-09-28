import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'training-buddy-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  hide : boolean;
  img : string;

  signupFrm! : FormGroup;
  frmBuilder! : FormBuilder;

  latitude : number;
  longitude : number;
  vicinity : string;

  constructor(private snack : MatSnackBar, private frm : FormBuilder, private apollo: Apollo, @Inject(Router) private router : Router, private cookieService: CookieService) {
    this.img = 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';

    //injections
    this.frmBuilder = frm;

    //variable initalizations
    this.hide = true;
    this.latitude = 0;
    this.longitude = 0;
    this.vicinity = "";
  }

  ngOnInit(): void {
    //construction of form
    this.signupFrm = this.frm.group({
      userNameSurname: ['', this.validateNameSurname],
      userEmail: ['', this.validateEmail],
      userPassword: ['', this.validatePassword],
      userDOB: ['', Validators.required],
      userCellNumber: ['', this.validateCellNumber],
      userGender: ['', this.validateGender],
      userLocation: ['', this.validateLocation]
    });
  }

  signup() {

    //check for errors in form
    for (const input in this.signupFrm.controls) {
      if (this.signupFrm.controls[input].invalid) {
        //prevent submission
        return;
      }
    }

    //form is valid

    const userNameSurname = this.signupFrm.controls['userNameSurname'].value;
    const userEmail = this.signupFrm.controls['userEmail'].value;
    const userPassword = this.signupFrm.controls['userPassword'].value;
    const userDOB = this.signupFrm.controls['userDOB'].value;
    const userCellNumber = this.signupFrm.controls['userCellNumber'].value;
    const userGender = this.signupFrm.controls['userGender'].value;
    //global vars with location
    //this.longitude
    //this.latitude
    ///////////////////////

    this.querySignup(userNameSurname, userEmail, userPassword, userDOB, userCellNumber, userGender, this.vicinity, this.longitude , this.latitude)
    .subscribe({
      next: (data : any) => {
        console.log(data.data.signup.message);
        if(data.data.signup.message == "User Already Exists failure"){
          this.snack.open("User Already Exists", "Close", {
            duration: 3000,
          });
          this.signupFrm.controls['userEmail'].setErrors({'error_msg' : 'User Already Exists'});
        }else{
          this.cookieService.set('id', data.data.signup.message);
          this.cookieService.set('email', userEmail);
          this.router.navigate(['/configureprofile']);
        }
      },
      error: () => {
        this.snack.open('Signup failed, please try again.', 'X', {
          duration: 2000
        });
      }
    })

  }

  querySignup(userNameSurname : string, userEmail : string, userPassword : string, userDOB : string, userCellNumber : string, userGender : string, location : string, longitude :number , latitude :number ) {

    const userName = userNameSurname.split(' ')[0];
    const userSurname = userNameSurname.split(' ')[1];
    const stravatokenTest= "myToken";

    return this.apollo
        .mutate ({
          mutation: gql`
            mutation{
              signup(userDto: {
                userName: "${userName}",
                userSurname: "${userSurname}",
                location: "${location}",
                gender: "${userGender}",
                email: "${userEmail}",
                cellNumber: "${userCellNumber}",
                password: "${userPassword}",
                dob: "${userDOB}"
                longitude: ${longitude}
                latitude: ${latitude}
                stravaToken: "${stravatokenTest}"
              }){
                message
              }
            }
          `,
        })
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

  /////////////////////////////////////////////////////////////////
  //Client side form validation

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

  //userPassword
  validatePassword(input : FormControl) : {[valtype : string] : string} | null {
    const userPassword = input.value;
    //regex for password (length >= 8, 1xCAP, 1xLOW, 1xCHAR, allows spaces)
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Z a-z\d#$@!%&*?]{8,}$/;
    if (!re.test(userPassword)) {
      //return error
      return {'error_msg' : 'Min length 8, 1x Uppercase, 1x Lowercase, 1x Special Char'}
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
