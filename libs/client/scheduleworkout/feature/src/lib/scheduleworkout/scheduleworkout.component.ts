import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'training-buddy-schedule-workout',
  templateUrl: './scheduleworkout.component.html',
  styleUrls: ['./scheduleworkout.component.scss']
})
export class ScheduleworkoutComponent implements OnInit {

  img : string;

  scheduleWorkout! : FormGroup;
  frmBuilder : FormBuilder;

  isWeightLifting! : boolean;
  isRunning! : boolean;
  isSwimming! : boolean;
  isRiding! : boolean;

  mins = '5';
  secs = '30';

  constructor(private builder : FormBuilder, private apollo : Apollo, private snackBar : MatSnackBar) {
    this.img = 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80';
    this.frmBuilder = builder;
    this.setAllFalse();
    this.isRunning = true;
  }

  setAllFalse() {
    this.isWeightLifting = false;
    this.isRunning = false;
    this.isSwimming = false;
    this.isRiding = false;
  }

  ngOnInit(): void {
    this.scheduleWorkout = this.frmBuilder.group({
      name: ['Training Activity', [Validators.required]],
      type: ['Running', [Validators.required]],
      hours: ['1', [Validators.required]],
      minutes: ['00', [Validators.required, Validators.max(59)]],
      seconds: ['', [Validators.required, Validators.max(59)]],
      distance: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],
      kmph: ['', [Validators.required]],
      mp100m: ['', [Validators.required]]
    });
  }

  activityToggle(value : string) {
    this.setAllFalse();
    if (value == 'Running') {
      this.isRunning = true;
      this.mins = '5';
      this.secs = '30';
    }
    if (value == 'Riding')
      this.isRiding = true;
    if (value == 'Swimming') {
      this.isSwimming = true;
      this.mins = '2';
      this.secs = '00';
    }
    if (value == 'WeightLifting') {
      this.isWeightLifting = true;
      this.mins = '1';
      this.secs = '00';
    }
  }

  add() {

    const type = this.scheduleWorkout.controls['type'].value || false;
    const name = this.scheduleWorkout.controls['name'].value || false;
    const hours = this.scheduleWorkout.controls['hours'].value || false;
    const minutes = this.scheduleWorkout.controls['minutes'].value || false;
    const seconds = this.scheduleWorkout.controls['seconds'].value || false;
    const date = this.scheduleWorkout.controls['date'].value || false;

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
          this.scheduleWorkout.reset();
          this.snackBar.open('Activity Added', 'X', {
            duration: 2000
          });
        });

        return;
      }      

    }

    //validate full form
    if (this.scheduleWorkout.invalid) {
      return;
    }

    const distance = this.scheduleWorkout.controls['distance'].value * 1000;
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
      this.scheduleWorkout.reset();
      this.snackBar.open('Activity Added', 'X', {
        duration: 3000
      });
    });

  }

  resetForm() {
    this.scheduleWorkout.reset();
    for (const obj in this.scheduleWorkout.controls) {
      this.scheduleWorkout.controls[obj].setErrors(null);
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

  calculateDuration() {
    console.log('calc duration');
  }

}
