import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'training-buddy-schedule-workout',
  templateUrl: './scheduleworkout.component.html',
  styleUrls: ['./scheduleworkout.component.scss']
})
export class ScheduleworkoutComponent implements OnInit {

  img : string;
  email: string;
  scheduleWorkout! : FormGroup;
  frmBuilder : FormBuilder;

  isWeightLifting! : boolean;
  isRunning! : boolean;
  isSwimming! : boolean;
  isRiding! : boolean;

  calculatedDuration : string;
  showCalculatedDuration : boolean;

  latitude : number;
  longitude : number;
  vicinity : string;

  mins = '5';
  secs = '30';

  constructor(private builder : FormBuilder, private apollo : Apollo, private snackBar : MatSnackBar, private cookieService: CookieService,private router : Router) {
    this.img = 'https://images.unsplash.com/photo-1512941675424-1c17dabfdddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';
    this.frmBuilder = builder;
    this.setAllFalse();
    this.isRunning = true;
    this.calculatedDuration = '';
    this.showCalculatedDuration = false;
    this.email = cookieService.get('email');
    this.latitude = 0;
    this.longitude = 0;
    this.vicinity = "";
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
      location: ['', [Validators.required]],
      type: ['Running', [Validators.required]],
      hours: ['1', [Validators.required]],
      minutes: ['00', [Validators.required, Validators.max(59)]],
      seconds: ['', [Validators.required, Validators.max(59)]],
      distance: ['', [Validators.required]],
      date: ['', [Validators.required]],
      kmph: ['', [Validators.required]],
    });
  }

  activityToggle(value : string) {
    this.setAllFalse();
    if (value == 'run') {
      this.isRunning = true;
      this.mins = '5';
      this.secs = '30';
    }
    if (value == 'ride')
      this.isRiding = true;
    if (value == 'swim') {
      this.isSwimming = true;
      this.mins = '2';
      this.secs = '00';
    }
    if (value == 'lift') {
      this.isWeightLifting = true;
      this.mins = '1';
      this.secs = '00';
    }
    this.calculateDuration();
  }
  queryActivitySchedule(title: string, time: string, activity: string, location: string, distance: string, duration: string){
    this.apollo
    .mutate({
      mutation: gql`
        mutation{
        activitySchedule(ActivitySchedule:{
          title: "${title}",
          email: "${this.email}",
          time: "${time}",
          activity: "${activity}",
          location: "${location}",
          distance: "${distance}",
          duration: "${duration}",
        }){
          message
        }
      }
    `,
    }).subscribe({
      next: (data: any) => {
        // console.log(data.data.activitySchedule.message);
        //routing
        this.router.navigate([`/schedule`]);
        
      }
    });
  }
  add() {

    //use the appropriate variable in the API call
    const type = this.scheduleWorkout.controls['type'].value || false;
    const location = this.scheduleWorkout.controls['location'].value || false;
    const name = this.scheduleWorkout.controls['name'].value || false;
    let hours = this.scheduleWorkout.controls['hours'].value || false;
    let minutes = this.scheduleWorkout.controls['minutes'].value || false;
    const seconds = this.scheduleWorkout.controls['seconds'].value || false;
    const date = this.scheduleWorkout.controls['date'].value || false;
    const kmph = this .scheduleWorkout.controls['kmph'].value || false;
    const distance = this.scheduleWorkout.controls['distance'].value || false;


    const d = new Date(date);
    const epoch = d.getTime();
    const timestamp = Math.trunc(epoch/1000).toString();

    if(hours.length == 1){
      hours = "0" + hours;
    }
    if(minutes.length == 1){
      minutes = "0" + minutes;
    }
    
    const duration = hours +":"+ minutes;
    console.log(duration);
    //base validation:
    if (!(name && type && date))
      return;

    if (this.isWeightLifting) {
      //weight lifting - duration
      if (!(hours || minutes))
        return;

      //schedule weight lifting workout API call
      //TODO(1):
      this.queryActivitySchedule(name,timestamp,type,location,"N/A",duration);

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
      this.queryActivitySchedule(name,timestamp,type,location,distance,duration);

      this.resetForm();
      return;
    }

    if (!(minutes || seconds))
      return;

    if (this.isRunning) {

      //schedule running workout API call
      //TODO(3):
      this.queryActivitySchedule(name,timestamp,type,location,distance,duration);

    }

    if (this.isSwimming) {

      //schedule swimming workout API call
      //TODO(4):  
      this.queryActivitySchedule(name,timestamp,type,location,distance,duration);

    }
    //location is required
    if(!location){
      return;
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
    this.showCalculatedDuration = false;
    //return if weight lifting
    if (this.isWeightLifting) {
      this.calculatedDuration = '';
      this.showCalculatedDuration = false;
      return;
    }
    //not weight lifting - distance is a requirement
    if (this.scheduleWorkout.controls['distance'].value == '' || this.scheduleWorkout.controls['distance'].value == null) {
      return;
    }
    //check riding - calculate and return
    if (this.isRiding) {
      if (this.scheduleWorkout.controls['kmph'].value == '' || this.scheduleWorkout.controls['kmph'].value == null)
        return;
      //calculate duration string here:
      const speed = this.scheduleWorkout.controls['kmph'].value;
      const distance = this.scheduleWorkout.controls['distance'].value;
      let duration = distance * 60 / speed;
      let hours = 0;
      while (duration >= 60) {
        hours++;
        duration-=60;
      }
      const mins = Math.trunc(duration);
      if (hours == 0) {
        this.calculatedDuration = `${mins} mins`;
      } else this.calculatedDuration = `${hours} hours ${mins} mins`;
      //show and return
      this.showCalculatedDuration = true;
      return;
    }
    //running or swimming - mins and secs is a requirement
    if (this.scheduleWorkout.controls['minutes'].value == '' || this.scheduleWorkout.controls['minutes'].value == null)
      return;
    if (this.scheduleWorkout.controls['seconds'].value == '' && this.scheduleWorkout.controls['seconds'].value != '00')
      return;
    if (this.scheduleWorkout.controls['minutes'].value > 59)
      this.mins = "59";
    if (this.scheduleWorkout.controls['seconds'].value > 59)
      this.secs = "59";
    //check running for calculation
    if (this.isRunning) {
      //calculate duration string here:
      console.log('here');
      const mins = Math.trunc(this.scheduleWorkout.controls['minutes'].value);
      const secs = Math.trunc(this.scheduleWorkout.controls['seconds'].value);
      const secsPerKm = Number((mins * 60)) + Number(secs);
      const distance = this.scheduleWorkout.controls['distance'].value;
      let durationSeconds = Number(distance) * Number(secsPerKm);
      durationSeconds /= 60;
      let hours = 0;
      while (durationSeconds >= 60) {
        hours++;
        durationSeconds-=60;
      }
      const outputMins = durationSeconds;
      if (hours == 0) {
        this.calculatedDuration = `${Math.trunc(outputMins)} mins`;
      } else this.calculatedDuration = `${Math.trunc(hours)} hours ${Math.trunc(outputMins)} mins`;
    }
    //check swimming for calulation
    if (this.isSwimming) {
      //calculate duration string here:
      const mins = this.scheduleWorkout.controls['minutes'].value;
      const secs = this.scheduleWorkout.controls['seconds'].value;
      const distance = this.scheduleWorkout.controls['distance'].value;
      const secsPerKm = (Number(mins * 60) + Number(secs)) * 10;
      let durationSeconds = Number(secsPerKm) * Number(distance);
      durationSeconds /= 60;
      let hours = 0;
      while (durationSeconds >= 60) {
        hours++;
        durationSeconds-=60;
      }
      const outputMins = durationSeconds;
      if (hours == 0) {
        this.calculatedDuration = `${outputMins} mins`;
      } else this.calculatedDuration = `${hours} hours ${Math.round(outputMins)} mins`;
    }
    this.showCalculatedDuration = true;
  }
    //Google geocoding functions
    onAutocompleteSelected(event : any) {
      this.vicinity = event.vicinity;
    }
  
    onLocationSelected(event: any) {
      if (event != null) {
        this.latitude = event.latitude;
        this.longitude = event.longitude;
      }
    }

}
