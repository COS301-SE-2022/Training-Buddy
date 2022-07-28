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
          id,
          startTime,
          organiser,
          participants{
            userName,
            userSurname,
            location,
            longitude,
            latitude,
            stravaToken,
            dob,
            gender,
            email,
            cellNumber,
            id,
            bio,
            metrics{
              lift,
              run,
              swim,
              ride
            },
            buddies,
            distance
          },
          activityType,
          startPoint,
          proposedDistance,
          proposedDuration
      }
      }`,
    })
  }

  getOneUser(email : string){
    return this.apollo
    .query({
      query: gql`
        query{
        getOne(email: "${ email }"){
          userName,
          id,
        }
      }
      `,
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
      organiser: this.getUserData(data.organiser),
      participants: this.getPartcipants(data.participants),
      activityType: data.activityType,
      startPoint: data.startPoint,
      proposedDistance: data.proposedDistance,
      proposedDuration: data.proposedDuration,
    }
  }
  getPartcipants(participants: any): any {
    const users: any[] = [];
    for(const participant in participants){
      users.push(this.getUserData(participant));
    }
    // console.log(users);
    return users;
  }

  getUserData(email: string): any {
    this.getOneUser(email).subscribe({
      next: (data: any) => {
        console.log(data.data.getOne);
        return{
          name: data.data.getOne.userName,
          image: this.getImage(data.data.getOne.id)
        }
      }
    })
  }

  getImage(id: string){
    return this.afStorage.ref("UserProfileImage/"+id);
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
