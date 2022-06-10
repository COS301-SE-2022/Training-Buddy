import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'training-buddy-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  //mock arrays (replace with api data)
  requests : any[] = [];
  oldBuddies : any[] = [];
  buddies : any[] = [];

  img : string;

  noBuddies : boolean;

  email = 'muziwandile@gmail.com';

  constructor(private apollo : Apollo) { 
    this.img = 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80';
    this.noBuddies = true;
  }

  ifPendingRequests() : boolean {
    return this.requests.length != 0;
  }

  ngOnInit(): void {
    
    this.getBuddieRecommended().subscribe({
      next: (data : any) => {
        data.data.findAll.map((el : any) => {
          this.buddies.push(el);
          this.oldBuddies.push(el);
          this.noBuddies = false;
        });
      }
    });

    this.getPendingRequests().subscribe({
      next: (data: any) => {
        data.data.getIncoming.map((el : any) => {
          this.requests.push(el);
        })
      }
    })

  }

  getSportString(data : any) : string {
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

  getBuddieRecommended() {

    return this.apollo
      .query({
        query: gql`query{
          findAll(
            email: "${this.email}",
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
          metrics{lift , run , swim , ride},
          buddies

        }
        }
         
        `,
      });
  }

  getPendingRequests() {

    return this.apollo
      .query({
        query: gql`query{
          getIncoming(
            email: "${this.email}",
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
      });

  }

  filter(value : any) {

    this.noBuddies = true;

    if (value == 'None') {
      this.buddies = this.oldBuddies;
      if (this.buddies.length != 0) this.noBuddies = false;
      return;
    }

    if (value == 'Run') {
      this.filterMap('run');
    }

    if (value == 'Ride') {
      this.filterMap('ride');
    }

    if (value == 'Swim') {
      this.filterMap('swim');
    }

    if (value == 'Lift') {
      this.filterMap('lift');
    }

    if (this.buddies.length != 0) {
      this.noBuddies = false;
    }

  }

  filterMap(attr : string) {
    this.buddies = this.buddies.filter((el : any) => {
      console.log(el.metrics[attr] == 1);
      return el.metrics[attr] == 1;
    });
  }

}