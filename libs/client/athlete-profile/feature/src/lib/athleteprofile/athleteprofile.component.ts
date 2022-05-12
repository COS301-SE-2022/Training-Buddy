import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  hideRun = false;
  hideRide = false;
  hideSwim = false;
  hideWeights = false;

  //pref droppers hide error
  errRunning : boolean;
  errRiding : boolean;
  errSwim : boolean;
  errWeight : boolean;
  errChooseSport : boolean;

  //form
  prefFrm! : FormGroup;
  frmBuilder! : FormBuilder;

  constructor(private frm : FormBuilder, private apollo : Apollo, @Inject(Router) private router : Router) { 
    this.img = 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80';
    this.errRunning = false;
    this.errRiding = false;
    this.errSwim = false;
    this.errWeight = false;
    this.errChooseSport = false;
    setTimeout(() => {
      this.running = true;
    }, 1000)
    //initializations:
    this.frmBuilder = frm;
  }

  ngOnInit(): void {
    this.prefFrm = this.frmBuilder.group({
      runningLevel: ['', this.nullValidator],
      runningBio: ['', this.nullValidator],
      ridingLevel: ['', this.nullValidator],
      ridingBio: ['', this.nullValidator],
      swimmingLevel: ['', this.nullValidator],
      swimmingBio: ['', this.nullValidator],
      weightLevel: ['', this.nullValidator],
      weightBio: ['', this.nullValidator]
    });
  }

  showRunning(e : string) {
    this.hideRun = false;
    if (e != 'None') {
      this.hideRun = true;
    }
  }

  showRiding(e : string) {
    this.hideRide = false;
    if (e != 'None') {
      this.hideRide = true;
    }
  }

  showSwim(e : string) {
    this.hideSwim = false;
    if (e != 'None') {
      this.hideSwim = true;
    }
  }

  showWeights(e : string) {
    this.hideWeights = false;
    if (e != 'None') {
      this.hideWeights = true;
    }
  }

  nullValidator() : null {
    return null;
  }

  save() {

    const runningLevel = this.prefFrm.controls['runningLevel'].value || null;
    const runningBio = this.prefFrm.controls['runningBio'].value || null;
    const ridingLevel = this.prefFrm.controls['ridingLevel'].value || null;
    const ridingBio = this.prefFrm.controls['ridingBio'].value || null;
    const swimmingLevel = this.prefFrm.controls['swimmingLevel'].value || null;
    const swimmingBio = this.prefFrm.controls['swimmingBio'].value || null;
    const weightLevel = this.prefFrm.controls['weightLevel'].value || null;
    const weightBio = this.prefFrm.controls['weightBio'].value || null;

    //////////////////
    //TESTING VALUES
    console.log(runningLevel);
    console.log(runningBio);
    console.log(ridingLevel);
    console.log(ridingBio);
    console.log(swimmingLevel);
    console.log(swimmingBio);
    console.log(weightLevel);
    console.log(weightBio);
    //////////////////

    let sportCounter = 0;
    let retFlag = false;
    this.errChooseSport = false;

    //validate form:
    if (runningLevel != null) {
      if (runningBio == null) {
        this.running = true;
        this.errRunning = true;
        retFlag = true;
      }
      sportCounter++;
    }

    if (ridingLevel != null) {
      if (ridingBio == null) {
        this.riding = true;
        this.errRiding = true;
        retFlag = true;
      }
      sportCounter++;
    }

    if (swimmingLevel != null) {
      if (swimmingBio == null) {
        this.swimming = true;
        this.errSwim = true;
        retFlag = true;
      }
      sportCounter++;
    }

    if (weightLevel != null) {
      if (weightLevel == null) {
        this.weights = true;
        this.errWeight = true;
      }
      sportCounter++;
    }

    if (retFlag) {
      return;
    }

    //check for at least on sport
    if (sportCounter == 0) {
      this.errChooseSport = true;
      this.running = true;
      return;
    }

    //form is valid here


    //TODO: Complete API call
    this.router.navigate(['/dashboard']); //for testing flow
    return;

    ///////////////////////
    //API CALL HERE........
    this.querySignup(runningLevel, runningBio, ridingLevel, ridingBio, swimmingLevel, swimmingBio, weightLevel, weightBio).then(res => {
      console.log(res);
      //route user to the dashboard
      this.router.navigate(['/dashboard']);
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
