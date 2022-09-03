import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apollo, gql } from 'apollo-angular';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'training-buddy-add-manual-activity',
  templateUrl: './addmanualactivity.component.html',
  styleUrls: ['./addmanualactivity.component.scss']
})
export class AddmanualactivityComponent implements OnInit {

  img : string;

  manualForm! : FormGroup;
  frmBuilder : FormBuilder;

  isWeightLifting : boolean;
  email: string;

  constructor(private builder : FormBuilder, private apollo : Apollo, private snackBar : MatSnackBar, private cookieService:CookieService) {
    this.img = 'https://images.unsplash.com/photo-1512941675424-1c17dabfdddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';
    this.email = this.cookieService.get('email');
    this.frmBuilder = builder;
    this.isWeightLifting = false;
  }

  ngOnInit(): void {
    this.manualForm = this.frmBuilder.group({
      name: ['', [Validators.required]],
      type: ['Running', [Validators.required]],

      hours: ['01', [this.validateHours]],
      minutes: ['00', [Validators.required]],
      seconds: ['00', [Validators.required]],

      distance: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });
  }

  //validate hours
  validateHours(input : FormControl):  {[valtype : string] : string} | null{
    if (input.value < 0) {
      return {'hours' : 'Hours cannot be negative'};
    }

    if( input.value == null){
      return {'hours' : 'Hours cannot be empty'};
    }
    return null;
  }
  activityToggle(value : string) {
    this.isWeightLifting = true;
    if (value != "WeightLifting") {
      this.isWeightLifting = false;
    }
  }

  add() {

    const type = this.manualForm.controls['type'].value || false;
    const name = this.manualForm.controls['name'].value || false;
    const hours = this.manualForm.controls['hours'].value || false;
    const minutes = this.manualForm.controls['minutes'].value || false;
    const seconds = this.manualForm.controls['seconds'].value || false;
    const date = this.manualForm.controls['date'].value || false;

    if (this.isWeightLifting) {
      const email = this.email
      //validate all except distance
      if (name && hours && minutes && seconds && date) {

      const time = this.calulateSeconds(hours, minutes, seconds);

        //to be removed when moving to API call:
        // this.resetForm();
        // this.snackBar.open('Activity Added', '', {
        //   duration: 2000
        // });
        // return;

        //API call for weight lifting:
        this.addActivity(type, date, null, name, null, time, email).then(() => {
          this.resetForm();
          this.snackBar.open('Activity Added', 'X', {
            duration: 2000
          });
        });

        return;
      }

    }

    //validate full form
    if (this.manualForm.invalid) {
      return;
    }

    const distance = this.manualForm.controls['distance'].value * 1000;
    const time = this.calulateSeconds(hours, minutes, seconds);
    const speed = this.calculateSpeed(time, distance);
    const email = this.email
    console.log(time);
    console.log(speed);
    //to be removed when moving to API call:
    // this.resetForm();
    // this.snackBar.open('Activity Added', '', {
    //   duration: 3000
    // });
    // return;

    this.addActivity(type, date, distance, name, speed, time, this.email).then(() => {
      this.resetForm();
      this.snackBar.open('Activity Added', 'X', {
        duration: 3000
      });
    });

  }

  resetForm() {
    this.manualForm.reset();
    for (const obj in this.manualForm.controls) {
      this.manualForm.controls[obj].setErrors(null);
    }
  }

  addActivity(type : string, date : string, distance : any, name : string, speed : any, time : number, email: string) {
    return new Promise((resolve, _) => {
      if (!(this.apollo.client === undefined))
      this.apollo
        .mutate ({
          mutation: gql`
            mutation{
              activityLog(Activitylog:{
                name : "${name}",
                distance : ${distance},
                speed: ${speed},
                time : ${time},
                dateCompleted: "${date}",
                email: "${email}",
                activityType: "${type}"
              }){
                message
              }

            }
          `,
        })
        .subscribe ((result) => {
          const res: any  = result
          console.log(res.data)
           resolve(res.data);
         });
     });
  }

  calulateSeconds(hours : number, minutes : number, seconds : number) : number {
    const hourToSeconds = hours * 60 * 60;
    const minutesToSeconds = minutes * 60;
    return hourToSeconds + minutesToSeconds + seconds; //returns total seconds of activity
  }

  calculateSpeed(time : number, distance : number) : number {
    return distance / time; //returns m/s^-1
  }

}
