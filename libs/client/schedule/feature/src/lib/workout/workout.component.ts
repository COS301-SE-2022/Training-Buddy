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
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'training-buddy-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {
  loading = true;
  workout : any;
  workoutID !: string;
  email : string;
  participants: any;
  organiser = false;
  isPastWorkout = false;
  completationStatus = false;

  constructor(private activated : ActivatedRoute,  private cookieService : CookieService, private apollo : Apollo,  private afStorage: AngularFireStorage, public dialog: MatDialog, private router : Router,private firestore : AngularFirestore){
    this.email = cookieService.get('email');
  }

  ngOnInit(): void {
    this.activated.params.subscribe((param : any) => {
      this.workoutID = param?.workoutID;
      this.getData();

    })
      this.liveData(this.email);
  }
  liveData(email: string){
    this.firestore
    .collection('ScheduledWorkouts', ref => ref.where('participants', 'array-contains', {'email': email, 'complete': false}))
    .valueChanges()
    .subscribe((el : any) => {
      el.map((curr:any)=>{
        if(curr.id === this.workoutID){
          const participants :any=[]
          curr.participants.map((el:any)=>{
            this.getOne(el.email).subscribe({
              next: (data: any) =>{
                this.fetchImages2(data.data.getOne).then((output : any) => {
                  participants.push(output);
                  this.participants = participants;
                });
              }

            });
          })

         }
      }
      )
    })
}
convertParticipants(curr: any){
  return{ email: curr.UserEntity.email,
    id: curr.UserEntity.id ,
    userSurname: curr.UserEntity.userSurname,
    image: curr.UserEntity.image,
    userName:curr.UserEntity.userName
  }
}
fetchImages2(usr : any) : Promise<any> {
  return new Promise<any>((res, rej) => {
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
           res(p);
         })
       ).subscribe();
  })
 }
getOne(email: string){
  return this.apollo
  .query({
    query: gql`
    query{
        getOne(email:"${ email }"){
        userName,
         userSurname,
         id,
         email
       }
       }
       `
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
            cellNumber,
            id,
            email
          },
          activityType,
          startPoint,
          proposedDistance,
          proposedDuration,
          complete
        }
      }`,
    })
  }
  getData(){
    this.getWorkout().subscribe({
      next: (data: any) =>{
        this.fetchImages(data.data.getWorkout.participants, data.data.getWorkout.complete).then((output : any[]) => {
          this.participants = output;
            });
        this.workout = this.convertQuery(data.data.getWorkout);
        if(this.workout.organiser === this.email){
          this.organiser = true;
        }
        this.loading = false;
      }
    });

  }

  viewProfile(participantid: string){
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
  fetchImages(data : any[], completeStatus : any []) : Promise<any> {
    return new Promise<any>((res, rej) => {
     const o : any[] = [];
     let i = 0;
     data.forEach((usr : any) => {
       this.afStorage
         .ref(`UserProfileImage/${usr.id}`)
         .getDownloadURL()
         .pipe(
           tap((url : any) => {
             const image = {image : url};
             const complete = {complete : completeStatus[i]};
             if(usr.email === this.email){
                this.completationStatus = completeStatus[i];
              }
             const p = {
               ...usr,
               ...image,
               ...complete
             }
             o.push(p);
             i++;
           })
         ).subscribe();
     });
     res(o);
    })
   }

  startDateTime(data: string): any{
    const date = new Date(Number(data) * 1000);
    const now = new Date();
    if(date < now){
      this.isPastWorkout = true;
    }
    const datepipe: DatePipe = new DatePipe('en-US')
    const formattedDate = datepipe.transform(date, 'HH:mm');
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
  dialogRef.afterClosed().subscribe();
  }
  rateUser(user: any): void {
    const dialogRef = this.dialog.open(RatingComponent, {
      width: '350px',
      data: user,
    });
    dialogRef.afterClosed().subscribe();
  }
  isCurrentUser(user: any): boolean{
    if(user.email === this.email){
      return true;
    }
    return false;
  }

}
