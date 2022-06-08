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

  calculatedDuration : number;
  showCalculatedDuration : boolean;

  mins = '5';
  secs = '30';

  constructor(private builder : FormBuilder, private apollo : Apollo, private snackBar : MatSnackBar) {
    this.img = 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80';
    this.frmBuilder = builder;
    this.setAllFalse();
    this.isRunning = true;
    this.calculatedDuration = 0;
    this.showCalculatedDuration = false;
  }

  setAllFalse() {
    this.isWeightLifting = false;
    this.isRunning = false;
    this.isSwimming = false;
    this.isRiding = false;
    this.showCalculatedDuration = false;
  }

  ngOnInit(): void {
    this.scheduleWorkout = this.frmBuilder.group({
      name: ['Training Activity', [Validators.required]],
      type: ['Running', [Validators.required]],
      hours: ['1', [Validators.required]],
      minutes: ['00', [Validators.required, Validators.max(59)]],
      seconds: ['', [Validators.required, Validators.max(59)]],
      distance: ['', [Validators.required]],
      date: [, [Validators.required]],
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
    const kmph = this .scheduleWorkout.controls['kmph'].value || false;
    const mp100m = this.scheduleWorkout.controls['mp100m'].value || false;
    const distance = this.scheduleWorkout.controls['distance'].value || false;

    //base validation:
    if (!(name && type && date))
      return;

    if (this.isWeightLifting) {
      //weight lifting - duration
      if (!(hours || minutes))
        return;

      //schedule weight lifting workout API call
      //TODO(1):

      this.resetForm();
      return;
    }

    //distance is required for riding, running & swimming:
    if (!distance)
      return;

    if (this.isRiding) {
      //riding - distance, speed
      if (!kmph)
        return;

      //schedule riding workout API call
      //TODO(2):

      this.resetForm();
      return;
    }

    if (!(minutes || seconds))
      return;

    if (this.isRunning) {

      //schedule running workout API call
      //TODO(3):

    }

    if (this.isSwimming) {

      //schedule swimming workout API call
      //TODO(4):  

    }

    this.resetForm();

  }

  resetForm() {
    this.scheduleWorkout.reset();
    for (const obj in this.scheduleWorkout.controls) {
      this.scheduleWorkout.controls[obj].setErrors(null);
    }
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
    // console.log('calc duration');

    this.showCalculatedDuration = false;
    //return if weight lifting
    if (this.isWeightLifting) {
      this.calculatedDuration = 0;
      this.showCalculatedDuration = false;
      return;
    }
    //not weight lifting - distance is a requirement
    if (this.scheduleWorkout.controls['distance'].value == null)
        return;
    //check riding - calculate and return
    if (this.isRiding) {
      if (this.scheduleWorkout.controls['kmph'].value == null)
        return;
      //calculate duration string here:

      //TODO(1):

      //show and return
      this.showCalculatedDuration = true;
      return;
    }
    //running or swimming - mins and secs is a requirement
    if (this.scheduleWorkout.controls['minutes'].value == null)
        return;
      if (this.scheduleWorkout.controls['seconds'].value == null)
        return;
    //check running for calculation
    if (this.isRunning) {
      //calculate duration string here:

      //TODO(2):
    
    }
    //check swimming for calulation
    if (this.isSwimming) {
      //calculate duration string here:

      //TODO(3):

    }

    this.showCalculatedDuration = true;
  }

}
