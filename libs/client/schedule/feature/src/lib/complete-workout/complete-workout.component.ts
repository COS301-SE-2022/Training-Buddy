import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'training-buddy-complete-workout',
  templateUrl: './complete-workout.component.html',
  styleUrls: ['./complete-workout.component.scss']
})
export class CompleteWorkoutComponent implements OnInit {
  email : string;
  constructor(public dialogRef: MatDialogRef<CompleteWorkoutComponent>,private router : Router, private apollo : Apollo,private cookieService : CookieService,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public workout: any) {
      this.email = cookieService.get('email');
    }

  ngOnInit(): void {
    console.log("user",this.workout);
  }
  completeWorkout(){
    this.snackBar.open('Your activity will be automatically fetched from strava.', 'Close', {
      duration: 2000,
    });
    this.dialogRef.close();
    this.router.navigate(['/schedule']);

  }
  addActivity(){
    this.apollo.mutate({
      mutation: gql`
      mutation{
        activityLog(Activitylog:{
          name : "${this.workout.title}",
          distance : ${this.workout.proposedDistance},
          speed: ${this.workout.speed},
          time : ${this.workout.time},
          dateCompleted: "${this.workout.startTime.original}",
          email: "${this.email}",
          activityType: "${this.workout.activityType}",
        }){
          message
        }
      }
      `
    }).subscribe({
      next: (data: any) =>{
        console.log(data.data.message);
        this.snackBar.open("Don't worry we recorded the workout for you.", 'Close', {
          duration: 2000,
        });
        this.dialogRef.close();
        this.router.navigate(['/schedule']);
      }
    })
  }

}
