import { Component, OnInit } from '@angular/core';
import { Apollo, gql, Query } from 'apollo-angular';
import {CookieService} from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'training-buddy-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  requests : any = [];
  oldBuddies : any[] = [];
  buddies : any[] = [];
  outgoingRequests: any;
  pendingrequests = true;
  doneloading = false;
  noBuddies : boolean;

  email : string;

  test! : Observable<any>;

  constructor(private apollo : Apollo, private cookieService:CookieService ) { 
    this.noBuddies = true;
    this.email = this.cookieService.get('email');
  }

  sendRequest(email : any) {
    this.apollo
      .mutate({
        mutation: gql`mutation{
          sendRequest(
            Sender: "${this.email}",
            Receiver: "${email}"
          ),{
            message
          }
        }
        `,
      }).subscribe({
        next: (data: any) => {
          // console.log(data);
        },
        error: (err : any) => {
          // console.log(err);
        }
      });
  }

  ifPendingRequests() : boolean {
    return this.requests == null;
  }

  ngOnInit(): void {
    
    this.getRequests().subscribe({
      next: (data: any) => {
        this.pendingrequests = false;
        this.requests = data.data.getIncoming;
        if (this.requests.length != 0)
          this.pendingrequests = true;
      }
    });

  }

  getRequests() {
    return this.apollo
      .watchQuery({
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
        // pollInterval: 1000,
        // fetchPolicy: 'network-only'
      },
      ).valueChanges;
  }

  getOutgoing() {
    return this.apollo
      .watchQuery({
        query: gql`query{
          getOutgoing(
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
        //pollInterval: 1000
      });
  }

  getBuddieRecommended() {
    return this.apollo
      .watchQuery({
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
        //pollInterval: 25000
      });
  }

  checkIfInOutgoing(email : string) : boolean {
    // return false;
    if (this.outgoingRequests == null)
      return false;
    for (let i = 0; i < this.outgoingRequests.length; i++) {
      if (this.outgoingRequests[i].email == email)
        return true;
    }
    return false;
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

  accept(email : string){
    this.apollo
    .mutate({
      mutation: gql`mutation{
        accept(
          Sender: "${email}",
          Receiver: "${this.email}"
      ){
       message
      }
      }
      `,
    }).subscribe({
      // next: (data : any) => {
      //   this.requests.map((el : any, i : number) => {
      //     if (el.email == email) {
      //       this.requests.splice(i, 1);
      //     }
      //   });
      // }
    });
  }

  reject(data : string){

    this.apollo
    .mutate({
      mutation: gql`mutation{
        reject(
          Sender: "${data}",
          Receiver: "${this.email}"
      ){
       message
      }
      }
      `,
    }).subscribe({
    });

  }
  
  getFriends(){
    return this.apollo
    .query({
      query: gql`query{
        getConnections(
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
      return el.metrics[attr] == 1;
    });
  }

}