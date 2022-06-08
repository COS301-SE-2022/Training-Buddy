import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apollo, gql } from 'apollo-angular';

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

  constructor(private builder : FormBuilder, private apollo : Apollo, private snackBar : MatSnackBar) {
    this.img = 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80';

    this.frmBuilder = builder;
    this.isWeightLifting = false;
  }

  ngOnInit(): void {
    this.manualForm = this.frmBuilder.group({
      name: ['', [Validators.required]],
      type: ['Running', [Validators.required]],

      hours: ['01', [Validators.required]],
      minutes: ['00', [Validators.required]],
      seconds: ['00', [Validators.required]],

      distance: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });
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

      //validate all except distance
      if (name && hours && minutes && seconds && date) {

      const time = this.calulateSeconds(hours, minutes, seconds);

        //to be removed when moving to API call:
        this.resetForm();
        this.snackBar.open('Activity Added', '', {
          duration: 2000
        });
        return;

        //API call for weight lifting:
        this.addActivity(type, date, null, name, null, time).then(() => {
          this.manualForm.reset();
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

    console.log(time);
    console.log(speed);
    //to be removed when moving to API call:
    this.resetForm();
    this.snackBar.open('Activity Added', '', {
      duration: 3000
    });
    return;

    this.addActivity(type, date, distance, name, speed, time).then(() => {
      this.manualForm.reset();
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

  addActivity(type : string, date : string, distance : any, name : string, speed : any, time : number) {
    return new Promise((resolve, _) => {
      if (!(this.apollo.client === undefined))
      this.apollo
        .mutate ({
          mutation: gql`
            mutation{
              
            }
          `,
        })
        .subscribe ((result) => {
          resolve(result);
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
