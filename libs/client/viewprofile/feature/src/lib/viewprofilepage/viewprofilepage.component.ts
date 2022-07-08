import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'training-buddy-profile-page',
  templateUrl: './viewprofilepage.component.html',
  styleUrls: ['./viewprofilepage.component.scss']
})
export class ViewprofilepageComponent implements OnInit {

  logList : any[] = [];
  email! : string;
  displayUser! : any;
  showlogs = false;

  constructor(private apollo : Apollo, private cookieService: CookieService){
    this.email = cookieService.get('email');
  } 

  ngOnInit(): void {

    this.getCurrentUser().valueChanges.subscribe({
      next: (data : any) => {
        this.displayUser = data.data.getOne;
      }
    })

    this.getActivityLogs().subscribe(
      {
        next: (res : any) => {
          res.data.getLogs.map((el : any) => {
            const temp = this.convertToCard(el);
            this.logList.push(temp);
            console.log('temp', temp);
            this.showlogs = true;
          });
        },
      }
    );

  }

  getCurrentUser() {
    return this.apollo
    .watchQuery ({
      query: gql`query{getOne(
        email:"${this.email}" 
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
    if (data.metrics == null) return '';
    const output = [];
    if (data.metrics.run) output.push('Run');
    if (data.metrics.ride) output.push('Ride');
    if (data.metrics.swim) output.push('Swim');
    if (data.metrics.lift) output.push('Weights');
    let retString = "";
    for (let i = 0; i < output.length; i++) {
      retString += output[i];
      if (i < output.length - 1) retString += ', ';
    }
    return retString;
  }

  convertToCard(data : any) : any {
    const date = new Date(data.dateComplete);
    return {
      name: data.name,
      type: data.activityType,
      distance: this.metersToKm(data.distance),
      speed: this.convertSpeed(data),
      time: this.secondsToString(data.time),
      date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
  }

  convertSpeed(data : any) : string {

    const mps = data.speed;
    console.log('activity type', data.activityType)
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

  getActivityLogs() {
    
    return this.apollo
        .query ({
          query: gql`query{getLogs(
            email:"${this.email}" 
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

}
