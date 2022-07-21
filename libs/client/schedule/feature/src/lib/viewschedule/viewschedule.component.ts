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

          //sort the data.
          swap.sort(function(a,b){
            return a.startDate.timestamp - b.startDate.timestamp;
          });
          console.log(swap);
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
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   
    return{
      timestamp: data,
      day: date.getDate(),
      month:  months[date.getMonth()],
      year: date.getFullYear(),
      hour: date.getHours(),
      minutes: date.getMinutes(),
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

}
