import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { fdatasync } from 'fs';
@Component({
  selector: 'training-buddy-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  requests : any = [];
  oldBuddies : any[] = [];
  buddies : any[] = [];
  outgoingRequests: any[] = [];
  pendingrequests = false;
  doneloading = false;
  noBuddies : boolean;

  email : string;

  constructor(private apollo : Apollo, private cookieService:CookieService, private firestore : AngularFirestore) { 
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

  async ngOnInit(): Promise<void> {

    this.getBuddieRecommended()
    .subscribe({
      next: (data : any) => {
        this.buddies = data.data.findAll;
        this.oldBuddies = this.buddies;
        if (this.buddies.length != 0)
          this.noBuddies = false;
        this.doneloading = true;
      }
    });

    //Getting Incoiming Requests:
    this.firestore
      .collection('BuddyRequests', ref => ref.where('receiver', '==', this.email))
      .valueChanges()
      .subscribe((data : any) => {
        this.pendingrequests = data.length != 0;
        this.requests = [];
        data.map((req : any) => {
          this.firestore
          .collection('Users', ref => ref.where('email', '==', req.sender))
          .valueChanges()
          .pipe(
            tap((usr : any) => {
              this.requests.push(usr[0]);
            })
          ).subscribe();
        });
      });

    //Getting Outgoing Requests:
    this.firestore
      .collection('BuddyRequests', ref => ref.where('sender', '==', this.email))
      .valueChanges()
      .subscribe((data : any) => {
        this.outgoingRequests = data;
      });

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
          buddies,
          id
        }
        }
        `,
      });
  }

  inOutgoing(email : string) : boolean {
    if (this.outgoingRequests == null)
      return false;
    let flag = false;
    this.outgoingRequests.map((el : any) => {
      if (el.receiver == email) {
        flag = true;
      }
    });
    return flag;
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

  accept(email : string) {

    this.requests.map((el : any, i : number) => {
      if (el.email == email) {
        this.requests.splice(i, 1);
      }
    });

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
    }).subscribe();
  }

  reject(data : string) {

    this.requests.forEach((el : any, i : number) => {
      if (el.email == data) {
        this.requests.splice(i, 1);
        console.log(this.requests);
        if (this.requests.length == 0) {
          this.pendingrequests = false;
        }
      }
    })

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
    }).subscribe();
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