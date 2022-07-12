import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'training-buddy-profile-page',
  templateUrl: './viewprofilepage.component.html',
  styleUrls: ['./viewprofilepage.component.scss'],
  animations: [

    trigger(
      'swipeRight', [
        transition(':enter', [
          animate(120, keyframes([
            style({
              transform: 'translate3d(-100%, 0, 0)',
              visibility: 'visible'
            }),
            style({
              transform: 'translate3d(0, 0, 0)'
            })
        ]))
        ]),
        transition(':leave', [
          
        ])
      ]
    ),

    trigger(
      'swipeLeft', [
        transition(':enter', [
          animate(120, keyframes([
            style({
              transform: 'translate3d(100%, 0, 0)',
              visibility: 'visible'
            }),
            style({
              transform: 'translate3d(0, 0, 0)'
            })
        ]))
        ]),
        transition(':leave', [
          
        ])
      ]
    ),

    trigger(
      'fadeIn', [
        transition(':enter', [
          animate(120, keyframes([
            style({
              opacity: '0'
            }),
            style({
              opacity: '1'
            })
          ]))
        ])
      ]
    )

  ]
})
export class ViewprofilepageComponent implements OnInit {

  //buddy component data
  buddyLoadComp = false;
  buddies! : string;
  buddyCount = 0;

  //loglist component data
  logLoadComp = false;
  logs! : string;
  activityCount = 0;

  guestprofile = false;
  loading = true;
  toggle = true;
  email! : string;
  id! : any;
  displayUser! : any;
  currentImage = 'https://images.unsplash.com/photo-1512941675424-1c17dabfdddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';

  constructor(private apollo : Apollo, private cookie : CookieService , private activated : ActivatedRoute){
   
    this.email = cookie.get('email');
    // this.id = this.activated.snapshot.paramMap.get('id');
    this.id = this.cookie.get('id');

  } 

  ngOnInit(): void {

    this.getCurrentUser().subscribe({
      next: (data : any) => {
        this.displayUser = data.data.getUser;
        this.loading = false;
      }
    })

    this.getBuddies().subscribe({
      next: (data : any) => {
        this.buddies = JSON.stringify(data.data.getConnections);
        this.buddyLoadComp = true;
        this.buddyCount = data.data.getConnections.length;
      }
    })

    this.getActivityLogs().subscribe(
      {
        next: (data : any) => {
          const swap: any[] = [];
          data.data.getLogs.map((el : any) => {
            swap.push(this.convertToCard(el));
          });
          this.logs = JSON.stringify(swap);
          this.logLoadComp = true;
          this.activityCount = swap.length;
        },
      }
    );

  }

  getActivityLogs() {
    return this.apollo
      .query ({
        query: gql`query{getLogs(
          email:"${ this.email }" 
        ){
          user,
          activityType, 
          dateComplete,
          distance,
          name,
          speed,
          time
        }
        }
        `,
      })
  }
  
  getBuddies() {
    return this.apollo
    .query({
      query: gql`query{
        getConnections(
          email: "${ this.email }",
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
        buddies,
        id
      }
      }
      `,
    });
  }

  convertToCard(data : any) : any {
    const date = new Date(data.dateComplete);
    return {
      name: data.name,
      type: this.type(data.activityType),
      distance: this.metersToKm(data.distance),
      speed: this.convertSpeed(data),
      time: this.secondsToString(data.time),
      date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
  }

  type(data : string) : string {
    if (data == 'Running') 
      return 'Run';
    if (data == 'Riding')
      return 'Ride';
    if (data == 'Swimming')
      return 'Swim';
    return 'Weights';
  }

  convertSpeed(data : any) : string {

    const mps = data.speed;
    if (data.activityType == 'Running') {
      let minperkm =  16.666666666667 / Number(mps);
      let min = 0;
      while (minperkm > 1) {
        min++;
        minperkm--;
      }
      const secs = Math.round((((Math.abs(minperkm) * 100) / 100) * 60));
      if (secs.toString().length != 1)
        return min.toString() + ':' + secs.toString() + ' min/km';
      return min.toString() + ':' + secs.toString() + '0' + ' min/km';
    }

    if (data.activityType == 'Riding') {
      return (Math.round(((mps * 3.6) * 100)) / 100).toString() + ' km/h';
    }

    if (data.activityType == 'Swimming') {
      return '2:00 min/100m';
    }

    return ''; //Weight Lifting
  }

  metersToKm(data : any) : string {
    return (Math.round(Number(data / 1000) * 100) / 100).toString() + 'km';
  }

  secondsToString(data : number) : string {
    data /= 60 //convert to minutes
    let hours = 0;
    while (data >= 60) {
      hours++;
      data -= 60;
    }
    const mins = Math.round(data);
    if (hours == 0)
      return `${mins} mins`;
    return `${hours} hours ${mins} mins`;
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
      // //pollInterval: 25000
    })
    
  }

  getSportString(data : any) : string {
    if (data?.metrics == null) return '';
    const output = [];
    if (data?.metrics.run) output.push('Run');
    if (data?.metrics.ride) output.push('Ride');
    if (data?.metrics.swim) output.push('Swim');
    if (data?.metrics.lift) output.push('Weights');
    let retString = "";
    for (let i = 0; i < output.length; i++) {
      retString += output[i];
      if (i < output.length - 1) retString += ', ';
    }
    return retString;
  }

  toggleBuddies() {
    this.toggle = true;
  }

  toggleLogs() {
    this.toggle = false;
  }

}
