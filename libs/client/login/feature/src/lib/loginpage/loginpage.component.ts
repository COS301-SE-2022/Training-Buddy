import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Apollo, gql} from 'apollo-angular';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'training-buddy-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {

  hide : boolean;
  img : string;
  userEmail : string;
  userPassword : string;
  loginFrm! : FormGroup;
  frmBuilder! : FormBuilder;

  constructor(private frm : FormBuilder, private apollo : Apollo, @Inject(Router) private router : Router, private cookieService:CookieService) {
    this.img = 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80';
  
    //injections
    this.frmBuilder = frm;

    //variable initalizations
    this.hide = true;
    this.userEmail = "";
    this.userPassword = "";
  
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
    
    this.userEmail = this.loginFrm.controls['userEmail'].value;
    this.userPassword = this.loginFrm.controls['userPassword'].value;

    ////////////////
    //testing values
    // console.log(userEmail);
    // console.log(userPassword);
    ////////////////
    
    ///////////////////////
    //API CALL AND LOGIN...
    // this.queryLogin(userEmail, userPassword ).then(res => {
    //   //after queryLogin(...)
    //   // console.log(res);

      
    //   // console.log(res.userName);
    //   // console.log(res.)
    //   //route to dash
    //   // this.router.navigate(['/dashboard']);
    // });
    this.queryLogin();
    ///////////////////////

  }

  ///////////////////////
  //API CALL RETURN PROMISE
  queryLogin(){
    this.apollo.mutate<userData>({
      mutation: gql`
      mutation{
        login(loginInput:{
          username: "${this.userEmail}",
          password: "${this.userPassword}"
        }){
          user{
            userName,
            userSurname,
            email
          }
        }
      }
    `,
    }).subscribe((response) =>{
      console.log(response.data?.login.user.email);
      if(response.data?.login.user.email == null){
        //send snackbar
        console.log("invalid credentials");
        
      }else{
        //store cookies
        this.setCookie();
        //route.
        this.router.navigate(['/dashboard']);
      }
    })
  }
  ///////////////////////
  setCookie(){
    this.cookieService.set('email',this.userEmail);
  }
   
  deleteCookie(){
    this.cookieService.delete('email');
  }
}
export interface userData{
  login:{
    user:{
      userName: string;
      userSurname: string;
      email: string;
    }
  }
}
