import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'training-buddy-view-schedule',
  templateUrl: './viewschedule.component.html',
  styleUrls: ['./viewschedule.component.scss']
})
export class ViewscheduleComponent implements OnInit {

  // constructor() { }
  upcomingEvents = false;
  loading = true;
  user!: any;
  workouts: any;
  workoutInvites: any;
  invitesAvailable = false;
  workoutsLoaded = false;
  workoutsCount = 0;
  email : string;

  constructor(private apollo : Apollo, private cookie : CookieService , private activated : ActivatedRoute, private router : Router, private cookieService:CookieService){
    this.email = this.cookieService.get('email');
  } 
  ngOnInit(): void {
    this.getData(this.email);
  }
 
  getWorkouts(email: string){
    return this.apollo
    .query({
      query: gql`
        query{
          getScheduleWorkout(email: "${ email }"){
            title,
            id,
            startTime,
            organiser,
            participants,
            activityType,
            startPoint,
            proposedDistance,
            proposedDuration
            }
        }`,
    })
  }

  getInvites(email: string){
    return this.apollo
    .query({
      query: gql`
        query{
          getIncomingInvites(email: "${ email }"){
              sender,
              receivers,
              workout{
                title,
                id,
                startTime,
                organiser,
                participants,
                activityType,
                startPoint,
                proposedDistance,
                proposedDuration
              }
            }
        }
      `
    })
  }

  getUserName(email: string){
    return this.apollo
    .query({
      query: gql`
        query{
          getOne(email: "${ email }"){
            userName
          }
        }`
    })
  }
  getOrganiser(email: string): any{
    this.getUserName(email).subscribe({
      next: (data: any) =>{
        console.log(data.data.getOne.userName);
        return data.data.getOne.userName;
      }
    })
  }
  getData(email: string){ //this gets all the scheduled workouts
    //get all the invites
    this.getInvites(email).subscribe({
      next: (data: any) =>{
        const swap: any[]= [];
        data.data.getIncomingInvites.map((el : any) => {
          swap.push(this.convertInvitedToCard(el));
        });

        //sort the data. 
        swap.sort(function(a,b){
          return a.startDate.timestamp - b.startDate.timestamp;
        });

        const dated: any[][] = [[]];
        let x = 0;
        let currentday = swap[0].startDate.day;
        
        for(let w = 0; w < swap.length; w++  ){
          if(swap[w].startDate.day == currentday){
            dated[x].push(swap[w]);
          }
          else{
            currentday = swap[w].startDate.day;
            x++;
            const temp: any[] = [];
            dated.push(temp)
            dated[x].push(swap[w]);
          }
        }
        this.workoutInvites = dated;
        if(this.workoutInvites.length != 0){
          this.invitesAvailable = true;
        }
      
      }
    })
    //to do api call to get the schedule workouts
    this.getWorkouts(email).subscribe({
      next: (data : any) => {
          const swap: any[] = [];
          data.data.getScheduleWorkout.map((el : any) => {
            swap.push(this.convertWorkoutToCard(el));
          });

          //sort the data.
          swap.sort(function(a,b){
            return a.startDate.timestamp - b.startDate.timestamp;
          });

          const dated: any[][] = [[]];
          let x = 0;
          let currentday = swap[0].startDate.day;
          
          for(let w = 0; w < swap.length; w++  ){
            if(swap[w].startDate.day == currentday){
              dated[x].push(swap[w]);
            }
            else{
              currentday = swap[w].startDate.day;
              x++;
              const temp: any[] = [];
              dated.push(temp)
              dated[x].push(swap[w]);
            }
          }
        
          // console.log(dated);
          this.workouts = dated;
          this.workoutsLoaded = true;
          this.workoutsCount = this.workouts.length;
          if (this.workoutsCount != 0) {
            this.upcomingEvents = true;
          }
          this.loading = false;
          // console.log(data)
      }
    })
  }
  convertInvitedToCard(data: any) : any{
    return{
   
      organiser: this.getOrganiser(data.workout.organiser),
      organiserEmail: data.workout.organiser,
      name: data.workout.title,
      id: data.workout.id,
      startPoint: this.startPoint(data.workout.startPoint),
      startDate: this.startDateTime(data.workout.startTime),
      image: this.image(data.workout.activityType)
    }
  }
  convertWorkoutToCard(data: any) : any {
    //to do write function to convert the data to a card
    return{
      //name: data.name,
      name: data.title,
      id: data.id,
      startPoint: this.startPoint(data.startPoint),
      startDate: this.startDateTime(data.startTime),
      image: this.image(data.activityType)

    }
  }

  startPoint(data: string): string{
    //to do write a function that returns the location.
    return "Hatfield Studios";
  }

  startDateTime(data: string): any{
    //write a function that returns the date and time 
    const date = new Date(Number(data) * 1000);
    const datepipe: DatePipe = new DatePipe('en-US')
    const formattedDate = datepipe.transform(date, 'HH:mm');
    console.log(formattedDate);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   
    return{
      timestamp: data,
      day: date.getDate(),
      month:  months[date.getMonth()],
      year: date.getFullYear(),
      time: formattedDate,
    }
  }

  image(data: string): string{
    // return this.currentImage;
    if (data == 'Running') 
    return "https://img.icons8.com/ios/50/000000/running.png";
    if (data == 'Riding')
      return "https://img.icons8.com/ios-filled/50/000000/bicycle.png";
    if (data == 'Swimming')
      return "https://img.icons8.com/ios/50/000000/swimming.png";
    return "https://img.icons8.com/ios/50/000000/dumbbell--v1.png";
  }

  fullWorkoutDetails(workoutID: string){
    console.log(workoutID);
    // this.router.navigate([`schedule/workout/${workoutID}`]);
  }

  acceptInvite(email: string, workoutID: string){
    console.log("accept clicked");
    this.apollo
    .mutate({
      mutation: gql`
        mutation{ 
          acceptInvite(
            email: "${ this.email }",
            sender: "${ email }", 
            workoutID: "${ workoutID }"
          ){
          message
          }
      }
    `,
    }).subscribe({
      next: (data : any) => {
        this.workoutInvites.map((el : any, i : number) => {
          if (el.email == email) {
            this.workoutInvites.splice(i, 1);
          }
        });
      }
    });

  }
  rejectInvite(email: string, workoutID: string){
    console.log("reject clicked");
    this.apollo
    .mutate({
      mutation: gql`
        mutation{ 
          rejectInvite(
            email: "${ this.email }",
            sender: "${ email }", 
            workoutID: "${ workoutID }"
          ){
          message
          }
      }
    `,
    }).subscribe({
      next: (data : any) => {
        this.workoutInvites.map((el : any, i : number) => {
          if (el.email == email) {
            this.workoutInvites.splice(i, 1);
          }
        });
      }
    });
  }
}
