import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import Fuse from 'fuse.js';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { valueToObjectRepresentation } from '@apollo/client/utilities';

@Component({
  selector: 'training-buddy-log-list',
  templateUrl: './loglist.component.html',
  styleUrls: ['./loglist.component.scss'],
  animations: [

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
export class LoglistComponent implements OnInit {

  @ViewChild('inputbox') input : any;

  logList : any[] = [];
  logListOriginal : any[] = [];
  nologs = false;
  loading = true;
  clearbutton = false;

  constructor(private apollo : Apollo, private cookie : CookieService) { }

  ngOnInit(): void {
    this.getActivityLogs().subscribe(
      {
        next: (data : any) => {
          data.data.getLogs.map((el : any) => {
            this.logList.push(this.convertToCard(el));
            this.logListOriginal.push(this.convertToCard(el));
          });
          if (data.data.getLogs.length == 0) {
            this.nologs = true;
          }
          this.loading = false;
        },
      }
    );
  }

  search(event : any) {
    const search = event.value;

    if (search.length == 0) {
      this.logList = this.logListOriginal;
      return;
    }

    const hits = new Fuse(this.logListOriginal, {
      keys: [
        'name',
        'type',
        'distance',
        'speed',
        'date',
        'time'
      ]
    }).search(
      search
    );

    this.logList = [];
    hits.map((el : any) => {
      this.logList.push(el.item);
    });

  }

  getActivityLogs() {
    return this.apollo
      .query ({
        query: gql`query{getLogs(
          email:"${this.cookie.get('profileemail')}" 
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

  showClear() {
    this.clearbutton = true;
  }

  hideClear() {
    this.clearbutton = false;
    this.input.nativeElement.value = '';
    this.logList = this.logListOriginal;
  }

}
