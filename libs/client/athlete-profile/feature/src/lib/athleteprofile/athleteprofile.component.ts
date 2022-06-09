import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'training-buddy-athlete-profile',
  templateUrl: './athleteprofile.component.html',
  styleUrls: ['./athleteprofile.component.scss']
})
export class AthleteprofileComponent implements OnInit {

  img : string;

  //error flags:
  noActivityChosen : boolean;

  //form
  prefFrm! : FormGroup;
  frmBuilder! : FormBuilder;

  //trainig radius
  radius : number;

  sliderMove(value: any) {
    this.radius = value;
  }

  constructor(private frm : FormBuilder, private apollo : Apollo, @Inject(Router) private router : Router) { 
    this.img = 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80';

    //initializations:
    this.frmBuilder = frm;
    this.noActivityChosen = false;
    this.radius = 2
  }

  ngOnInit(): void {
    this.prefFrm = this.frmBuilder.group({
      running: [''],
      riding: [''],
      swimming: [''],
      weightLifting: [''],
      bio: ['', [Validators.required, Validators.minLength(30)]]
    });
  }

  updateError() {
    const running = this.prefFrm.controls['running'].value || false;
    const riding = this.prefFrm.controls['riding'].value || false;
    const swimming = this.prefFrm.controls['swimming'].value || false;
    const weightLifting = this.prefFrm.controls['weightLifting'].value || false;
    this.noActivityChosen = false;
    if (!(running || riding || swimming || weightLifting)) {
      this.noActivityChosen = true;
    }
  }

  save() {

    const running = this.prefFrm.controls['running'].value || false;
    const riding = this.prefFrm.controls['riding'].value || false;
    const swimming = this.prefFrm.controls['swimming'].value || false;
    const weightLifting = this.prefFrm.controls['weightLifting'].value || false;
    const bio = this.prefFrm.controls['bio'].value;
    this.noActivityChosen = false;
    if (!(running || riding || swimming || weightLifting)) {
      this.noActivityChosen = true;
    }

    if (this.prefFrm.invalid) {
      return;
    }

    //////////////////
    //TESTING VALUES
    // console.log(running);
    // console.log(riding);
    // console.log(swimming);
    // console.log(weightLifting);
    // console.log(bio);
    //////////////////

    //form is valid here

    //TODO: Complete API call
    this.router.navigate(['/strava/link']); //for testing flow

    ///////////////////////
    //API CALL HERE........
    this.queryProfile("email", running, riding, swimming, weightLifting, bio , this.radius).then(res => {
      console.log(res);
      if(res ==="failure"){
        
      }else{
        this.router.navigate(['/strava/link']);
      }
      //route user to the dashboard
     
    }).catch(rej => {
      console.log(rej);
    });
    ///////////////////////

  }

  ///////////////////////
  //API CALL RETURN PROMISE
  queryProfile(email : string, running : boolean, riding : boolean, swimming : boolean, weightLifiting : boolean, bio : string , distance: number ) {
    
    console.log(running)
    return new Promise((resolve, _) => {
      if (!(this.apollo.client === undefined))
      this.apollo
        .mutate ({
          mutation: gql`mutation{
          userConfig(userConfig:{
            email : "${email}",
            distance : ${distance},
            riding: ${riding},
            running: ${running},
            swimming: ${swimming},
            weightLifting: ${weightLifiting},
            bio: "${bio}",
          }){
            message
          }
        }

            
          `,
        })
        .subscribe ((result) => {
          let res: any  = result
          console.log("here")
           resolve(res.data.userConfig.message);
         });
     });
   }
  ///////////////////////

}
