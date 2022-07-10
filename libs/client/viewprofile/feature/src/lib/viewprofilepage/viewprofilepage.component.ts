import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {CookieService} from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

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
          animate(300, keyframes([
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

  loading = true;
  toggle = true;
  email! : string;
  displayUser! : any;

  currentImage = 'https://images.unsplash.com/photo-1512941675424-1c17dabfdddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';

  constructor(private apollo : Apollo, private cookieService: CookieService){
    this.email = cookieService.get('email');
  } 

  ngOnInit(): void {

    this.getCurrentUser().subscribe({
      next: (data : any) => {
        this.displayUser = data.data.getOne;
        this.loading = false;
      }
    })



    // this.getBuddies().subscribe({
    //   next: (data : any) => {
    //     // this.buddies = data.data.getBuddies;
    //     this.buddies.next(data.data.getConnections);
    //   }
    // })

  }

  getCurrentUser() {
    return this.apollo
    .query({
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
