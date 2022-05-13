import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'training-buddy-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {

  hide : boolean;
  img : string;

  loginFrm! : FormGroup;
  frmBuilder! : FormBuilder;

  constructor(private frm : FormBuilder, private apollo : Apollo, @Inject(Router) private router : Router) {
    this.img = 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80';
  
    //injections
    this.frmBuilder = frm;

    //variable initalizations
    this.hide = true;
  }

  ngOnInit(): void {
    this.loginFrm = this.frmBuilder.group({
      userEmail : ['', Validators.required],
      userPassword : ['', Validators.required]
    });
  } 

  login() {

    //check for errors in form
    for (const input in this.loginFrm.controls) {
      if (this.loginFrm.controls[input].invalid) {
        //prevent submission
        return;
      }
    }

    const userEmail = this.loginFrm.controls['userEmail'].value;
    const userPassword = this.loginFrm.controls['userPassword'].value;

    ////////////////
    //testing values
    // console.log(userEmail);
    // console.log(userPassword);
    ////////////////

    ///////////////////////
    //API CALL AND LOGIN...
    this.queryLogin(userEmail, userPassword).then(res => {
      //after queryLogin(...)
      // console.log(res);
      //route to dash
      this.router.navigate(['/dashboard']);
    });
    ///////////////////////

  }

  ///////////////////////
  //API CALL RETURN PROMISE
  queryLogin(userEmail : string, userPassword : string) {
    return new Promise((resolve, reject) => {
      if (!(this.apollo.client === undefined))
      this.apollo
        .mutate ({
          mutation: gql`
            mutation{
              login(loginInput:{
                username: "${userEmail}",
                password: "${userPassword}"
              }){
                accessToken,
                user{
                  userName,
                  userSurname
                }
              }
            }
          `,
        })
        .subscribe ((result) => {
          resolve(result);
        });
    })
  }
  ///////////////////////

}
