import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { pipe, tap } from 'rxjs';
import { RatingComponent } from '../rating/rating.component';
import { WorkoutInviteComponent } from '../workout-invite/workout-invite.component';

@Component({
  selector: 'training-buddy-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  // constructor() { }
  loading = true;
  workout : any;
  workoutID !: string;
  email : string;
  participants: any;
  organiser = false;


  constructor(private activated : ActivatedRoute,  private cookieService : CookieService, private apollo : Apollo,  private afStorage: AngularFireStorage, public dialog: MatDialog, private router : Router){
    this.email = cookieService.get('email');
  }

  ngOnInit(): void {
    // console.log('it works');
    this.activated.params.subscribe((param : any) => {
      this.workoutID = param?.workoutID;
      console.log(this.workoutID);
      this.getData();

    })
  }
  getWorkout(){
    return this.apollo
    .query({
      query: gql`
      query{
        getWorkout(
          email:"${ this.email }",
          workoutID: "${ this.workoutID }",
        ){
          title,
          startTime,
          organiser,
          participants{
            userName,
            userSurname,
            id,
            email
          },
          activityType,
          startPoint,
          proposedDistance,
          proposedDuration,
        }
      }`,
    })
  }
  getData(){
    // this.getWorkout().subscribe({
    //   next: (data: any) =>{
    //     const swap: any[]= [];
    //     data.data.getIncomingInvites.map((el : any) => {
    //       swap.push(this.convertInvitedToCard(el));
    //     });
    this.getWorkout().subscribe({
      next: (data: any) =>{
        // console.log(data.data.getWorkout)
        // const dummy: any[] = [];
        // data.data.participants.map((el : any) => {
        //   dummy.push(el);
        // });

        this.fetchImages(data.data.getWorkout.participants).then((output : any[]) => {
          console.log(output);
          this.participants = output;
        });

        this.workout = this.convertQuery(data.data.getWorkout);
        if(this.workout.organiser.email === this.email){
          this.organiser = true;
        }
        this.loading = false;
      }
    });

  }

  viewProfile(participantid: string){
    console.log(participantid);
    this.router.navigate([`/profile/${participantid}`]);
  }
  convertQuery(data : any) : any {

  return {
      title: data.title,
      startTime: this.startDateTime(data.startTime),
      organiser: data.organiser,
      activityType: data.activityType,
      startPoint: data.startPoint,
      proposedDistance: data.proposedDistance,
      proposedDuration: data.proposedDuration,
    }
  }
  fetchImages(data : any[]) : Promise<any> {
    return new Promise<any>((res, rej) => {
     const o : any[] = [];
     data.forEach((usr : any) => {
       this.afStorage
         .ref(`UserProfileImage/${usr.id}`)
         .getDownloadURL()
         .pipe(
           tap((url : any) => {
             const image = {image : url};
             const p = {
               ...usr,
               ...image
             }
             o.push(p);
           })
         ).subscribe();
     });
     res(o);
    })
   }

  startDateTime(data: string): any{
    //write a function that returns the date and time
    const date = new Date(Number(data) * 1000);
    const datepipe: DatePipe = new DatePipe('en-US')
    const formattedDate = datepipe.transform(date, 'HH:mm');
    // console.log(formattedDate);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return{
      day: date.getDate(),
      month:  months[date.getMonth()],
      year: date.getFullYear(),
      time: formattedDate,
    }
  }

  openDialog(): void {
  const dialogRef = this.dialog.open(WorkoutInviteComponent, {
    minWidth: '300px',
    maxWidth: '80%',
    data: this.workoutID
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
  }
  rateUser(user: any): void {
    const dialogRef = this.dialog.open(RatingComponent, {
      width: '250px',
      data: user,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
