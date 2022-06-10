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
  email : string;
  constructor(private apollo : Apollo, private cookieService: CookieService){
    this.email = cookieService.get('email');
  } 

  ngOnInit(): void {
    this.getActivityLogs().subscribe(
      {
        next: (res : any) => {
          // console.log(res.data.getLogs);
          res.data.getLogs.map((el : any) => {
            // console.log(this.convertToCard(el));
            this.logList.push(this.convertToCard(el));
          })
        },
      }
    )
  }

  convertToCard(data : any) : any {
    return {
      name: data.name,
      type: data.activityType,
      distance: this.metersToKm(data.distance),
      speed: this.convertSpeed(data),
      time: this.secondsToString(data.time),
      date: data.dateComplete.split('T')[0]
    }
  }

  convertSpeed(data : any) : string {

    const mps = data.speed;

    if (data.activityType == 'Run') {
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

    if (data.activityType == 'Ride') {
      return (Math.round(((mps * 3.6) * 100)) / 100).toString() + ' km/h';
    }

    if (data.activityType == 'Swim') {
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
