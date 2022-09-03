import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { tap } from 'rxjs';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'training-buddy-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger(
      'fadeIn', [
        transition(':enter', [
          animate(200, keyframes([
            style({
              opacity: '0'
            }),
            style({
              opacity: '1'
            })
          ]))
        ]),
        transition(':leave', [
          animate(300, keyframes([
            style({
              opacity: '1'
            }),
            style({
              opacity: '0'
            })
          ]))
        ])
      ],
    )
  ]
})

export class DashboardComponent implements OnInit {
  requests : any = [];
  oldBuddies : any[] = [];
  buddies : any[] = [];
  outgoingRequests: any;
  pendingrequests = false;
  doneloading = false;
  noBuddies : boolean;
  email : string;
  constructor(private snackBar : MatSnackBar, private apollo : Apollo, private cookieService:CookieService, private firestore : AngularFirestore, private afStorage: AngularFireStorage) { 
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
        next: () => {
          this.snackBar.open('Invitation successfully sent.', 'X', {
            duration: 3000
          });
        }
      });
  }

  ifPendingRequests() : boolean {
    return this.requests == null;
  }

  ngOnInit() {

    //bind to the current user
    this.firestore
      .collection('Users', ref => ref.where('email', '==', this.email))
      .valueChanges()
      .subscribe((curr : any) => {
        const buds = curr[0].buddies;
        if (this.buddies != null) {
          buds.forEach((b : any) => {
            this.buddies.forEach((el : any, i : number) => {
              if (b == el.email) {
                this.buddies.splice(i, 1);
              }
            })
          });
        }
      })

    //getting rec. buddies from engine
    this.getBuddieRecommended().subscribe({
      next: async (data : any) => {
        const filter = this.removeOverlapConnections(data.data.findAll);
        await this.fetchImages(filter).then((o : any[]) => {
          this.buddies = o;
          this.oldBuddies = o;
          console.log('buddies', this.buddies)
          if (this.buddies.length == 0)
            this.noBuddies = false;
            // console.log('onoBuddies', this.noBuddies)
          this.doneloading = true;
        })
      }
    });

    //logic for the incoming and dynamics on sender client
    this.firestore
      .collection('BuddyRequests', ref => ref.where('receiver', '==', this.email))
      .valueChanges()
      .subscribe((inRequests : any) => {

        this.requests = [];
        this.pendingrequests = false;

        //get the users the requests came from:

        if (inRequests.length != 0) {

          this.pendingrequests = true;

          inRequests.forEach((req : any) => {
            
            this.firestore
            .collection('Users', ref => ref.where('email', '==', req.sender))
            .valueChanges()
            .subscribe((incomingUsrs : any) => {
              this.requests = [];
              incomingUsrs.forEach((usr : any) => {
                this.fetchSingleImage(usr).then((imgUsr : any) => {
                  this.requests.push(imgUsr);
                }); 
              });
            })
          })

        }

      })

    //getting outgoing for disabling request button on current client
    this.firestore
      .collection('BuddyRequests', ref => ref.where('sender', '==', this.email))
      .valueChanges()
      .subscribe((outgoing : any) => {
        this.outgoingRequests = outgoing;
      });

  }

  fetchSingleImage(usr : any) : Promise<any> {
    return new Promise<any>((res, rej) => {
      this.afStorage
      .ref(`UserProfileImage/${usr.id}`)
      .getDownloadURL()
      .pipe(
        tap((url : any) => {
          const image = {image : url};
          res({
            ...usr,
            ...image
          });
        })
      ).subscribe();
    })
  }

  fetchImages(data : any[]) : Promise<any> {
   return new Promise<any>((res, rej) => {
    const o : any[] = [];
    data.forEach((usr : any) => {
      this.afStorage
        .ref(`UserProfileImage/${usr.id}`)
        .getDownloadURL()
        .pipe(
          tap((url : any) => {
            const image = {image : url};
            const p = {
              ...usr,
              ...image
            }
            o.push(p);
          })
        ).subscribe();
    });
    res(o);
   })
  }

  removeRec(usr : any) {
    this.buddies = this.buddies.filter((b : any) => {
      return usr.email != b.email;
    });
    this.oldBuddies = this.oldBuddies.filter((b : any) => {
      return usr.email != b.email;
    });
  }

  trackById(usr : any, index : number) {
    return usr.id;
  }

  //remove paired buddies
  removeOverlapConnections(data : any) : any[] {
    if (data == null)
      return data;
    const o : any[] = [];
    data.map((el : any) => {
      let flag = true;
      el.buddies.map((cons : any) => {
        if (this.email == cons)
          flag = false;
      });
      if (flag)
        o.push(el);
    });
    return o;
  }

  //filter outgoing
  filterOutgoing(data : any) : any[] {
    const o : any[] = [];
    data.map((el : any) => {
      if (el.sender == this.email)  
        o.push(el);
    });
    return o;
  }

  //Get Incoming Requests login
  async getUsersFromRequests(requests : any[]) {
    const o : any[] = [];
    this.firestore.collection('Users').valueChanges().subscribe(resp => {
      requests.map((req : any) => {
        resp.map((usr : any) => {
          if (usr.email == req.sender) {
            o.push(usr);
            return;
          }
        });
      });
    });
    return await this.fetchImages(o);
  }

  filterIncoming(data : any) : any[] {
    const o : any[] = [];
    data.map((el : any) => {
      if (el.receiver == this.email)
        o.push(el);
    });
    return o;
  }

  getOutgoing() {
    return this.apollo
      .query({
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

  accept(email : string){
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
    }).subscribe({
      next: () => {
        this.snackBar.open('Request accepted.', 'X', {
          duration: 2000
        });
      },
      error: () => {
        this.snackBar.open('Request rejected.', 'X', {
          duration: 2000
        });
      }
    });
  }

  reject(data : string){
    this.requests.forEach((el : any, i : number) => {
        if (el.email == data) {
          this.requests.splice(i, 1);
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