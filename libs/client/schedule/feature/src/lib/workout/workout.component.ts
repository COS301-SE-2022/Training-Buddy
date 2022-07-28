import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';

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
  constructor(private activated : ActivatedRoute, private cookieService : CookieService, private apollo : Apollo,  private afStorage: AngularFireStorage){
    this.email = cookieService.get('email');
  } 
  
  ngOnInit(): void {
    // console.log('it works');
    this.activated.params.subscribe((param : any) => {
      this.workoutID = param?.workoutID;
      // console.log(this.workoutID);
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
        // console.log(data.data.getWorkout);
       
       
        console.log(data.data.getWorkout);
        this.workout = this.convertQuery(data.data.getWorkout);
        console.log(this.workout);
        this.loading = false;

      }
    });

  }

  convertQuery(data : any) : any {
  return {
      title: data.title,
      startTime: this.startDateTime(data.startTime),
      organiser: data.organiser,
      participants: data.participants,
      activityType: data.activityType,
      startPoint: data.startPoint,
      proposedDistance: data.proposedDistance,
      proposedDuration: data.proposedDuration,
    }
  }
  getImage(id: string){
    // this.afStorage.ref("UserProfileImage/"+id).
    // getDownloadURL().subscribe((downloadURL) => {
    //   console.log(downloadURL);
    //   return downloadURL;
    // });
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
  
}
