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
    this.img = 'https://images.unsplash.com/photo-1512941675424-1c17dabfdddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';
  
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

    for (const input in this.loginFrm.controls) {
      if (this.loginFrm.controls[input].invalid) {
        return;
      }
    }
    
    this.userEmail = this.loginFrm.controls['userEmail'].value;
    this.userPassword = this.loginFrm.controls['userPassword'].value;

    this.queryLogin().subscribe((response : any) =>{
      console.log(response.data.login.user.email);
      if(response.data?.login.user.email == null){
        console.log("invalid credentials"); //make this a notification
      } else {
        this.cookieService.set('email', response.data.login.user.email);
        this.router.navigate(['/dashboard']);
      }
    });

  }

  queryLogin(){
    return this.apollo.mutate<userData>({
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
    })
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
