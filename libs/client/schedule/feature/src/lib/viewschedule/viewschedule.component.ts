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
  id!: any;
  user!: any;
  workouts: any;
  workoutsLoaded = false;
  workoutsCount = 0;
  currentImage = 'https://images.unsplash.com/photo-1512941675424-1c17dabfdddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';
  constructor(private apollo : Apollo, private cookie : CookieService , private activated : ActivatedRoute, private router : Router){
  } 
  ngOnInit(): void {
    this.activated.params.subscribe((param : any) => {
      const routerid = param?.id;
      this.id = routerid
      if (routerid == null)
        this.id = this.cookie.get('id');

      this.getCurrentUser().subscribe({
        next: (data : any) => {
          this.user = data.data.getUser;
          this.loading = false;
          this.getData(this.user.email);
        },
      })
    })

  }
  getCurrentUser() {
    return this.apollo
    .query({
      query: gql`query{getUser(
        UserID:"${this.id}"
      ){
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
          bio,
          metrics{lift , ride , run , swim},
          buddies
      }
      }
      `,
    })
    
  }
  getWorkouts(email: string){
    return this.apollo
    .query({
      query: gql`
        query{
          getScheduleWorkout(email: "${ email }"){
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
  getData(email: string){ //this gets all the scheduled workouts
    //to do api call to get the schedule workouts
    this.getWorkouts(email).subscribe({
      next: (data : any) => {
          const swap: any[] = [];
          data.data.getScheduleWorkout.map((el : any) => {
            swap.push(this.convertToCard(el));
          });
        this.workouts = swap;
        this.workoutsLoaded = true;
        this.workoutsCount = this.workouts.length;
        if (this.workoutsCount != 0) {
          this.upcomingEvents = true;
        }
        console.log(data)
      }
    })
  }

  convertToCard(data: any) : any {
    //to do write function to convert the data to a card
    return{
      //name: data.name,
      name: "Training",
      type: this.type(data.activityType),
      startPoint: this.startPoint(data.startPoint),
      startTime: this.startTime(data.startTime),
      startDate: this.startDate(data.startTime),

    
    }
  }

  type(data: string): string{
    if (data == 'Running') 
    return 'Run';
    if (data == 'Riding')
      return 'Ride';
    if (data == 'Swimming')
      return 'Swim';
    return 'Weights';
  }

  startPoint(data: string): string{
    //to do write a function that returns the location.
    return "Hatfield Studios";
  }

  startTime(data: string): string{
    //write a function that returns the date and time 
    // e.g 13:00
    return "13:00";
  }

  startDate(data: string): string{
    //return the date
    // e.g 17 june
    return "17 june";
  }

}
