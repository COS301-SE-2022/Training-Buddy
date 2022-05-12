import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'training-buddy-athlete-profile',
  templateUrl: './athleteprofile.component.html',
  styleUrls: ['./athleteprofile.component.scss']
})
export class AthleteprofileComponent implements OnInit {

  img : string;

  //pref droppers
  defaultBeginner = "Beginner";
  running = false;
  riding = false;
  swimming = false;
  weights = false;

  //form
  prefFrm! : FormGroup;
  frmBuilder! : FormBuilder;

  constructor(private frm : FormBuilder, private apollo : Apollo) { 
    this.img = 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80';
    setTimeout(() => {
      this.running = true;
    }, 1000)
    //initializations:
    this.frmBuilder = frm;
  }

  ngOnInit(): void {
    this.prefFrm = this.frmBuilder.group({
      runningLevel: ['', Validators.required],
      runningBio: ['', Validators.required],
      ridingLevel: ['', Validators.required],
      ridingBio: ['', Validators.required],
      swimmingLevel: ['', Validators.required],
      swimmingBio: ['', Validators.required],
      weightLevel: ['', Validators.required],
      weightBio: ['', Validators.required]
    });
  }

  save() {
    //validate form:
    if (this.prefFrm.controls['runningBio'].errors || this.prefFrm.controls['runningLevel'].errors) {
      this.running = true;
      return;
    }
    if (this.prefFrm.controls['ridingBio'].errors || this.prefFrm.controls['ridingLevel'].errors) {
      this.riding = true;
      return;
    }
    if (this.prefFrm.controls['swimmingBio'].errors || this.prefFrm.controls['swimmingLevel'].errors) {
      this.swimming = true;
      return;
    }
    if (this.prefFrm.controls['weightBio'].errors || this.prefFrm.controls['swimmingBio'].errors) {
      this.weights = true;
      return;
    }

    //form is valid here

    const runningLevel = this.prefFrm.controls['runningLevel'].value;
    const runningBio = this.prefFrm.controls['runningBio'].value;
    const ridingLevel = this.prefFrm.controls['ridingLevel'].value;
    const ridingBio = this.prefFrm.controls['ridingBio'].value;
    const swimmingLevel = this.prefFrm.controls['swimmingLevel'].value;
    const swimmingBio = this.prefFrm.controls['swimmingBio'].value;
    const weightLevel = this.prefFrm.controls['weightLevel'].value;
    const weightBio = this.prefFrm.controls['weightBio'].value;

    //////////////////
    //TESTING VALUES
    // console.log(runningLevel);
    // console.log(runningBio);
    // console.log(ridingLevel);
    // console.log(ridingBio);
    // console.log(swimmingLevel);
    // console.log(swimmingBio);
    // console.log(weightLevel);
    // console.log(weightBio);
    //////////////////

    ///////////////////////
    //API CALL HERE........
    this.querySignup(runningLevel, runningBio, ridingLevel, ridingBio, swimmingLevel, swimmingBio, weightLevel, weightBio).then(res => {
      console.log(res);
      //route user to the dashboard
    });
    ///////////////////////

  }

  ///////////////////////
  //API CALL RETURN PROMISE
  querySignup(runLevel : string, runBio : string, rideLevel : string, rideBio : string, swimLevel : string, swimBio : string, weightLevel : string, weightBio : string) {
    return new Promise((resolve, _) => {
      if (!(this.apollo.client === undefined))
      this.apollo
        .mutate ({
          mutation: gql`
            query needs to be written here
          `,
        })
        .subscribe ((result) => {
          resolve(result);
        });
    })
  }
  ///////////////////////

}
