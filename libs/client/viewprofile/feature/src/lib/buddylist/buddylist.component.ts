import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'training-buddy-buddies-list',
  templateUrl: './buddylist.component.html',
  styleUrls: ['./buddylist.component.scss']
})
export class BuddylistComponent implements OnInit {

  constructor(private apollo : Apollo, private cookie : CookieService) { 
    
  }

  ngOnInit(): void {
    this.getBuddies().subscribe({
      next: (data : any) => {
        console.log('data for buddies', data.data.getConnections)
      }
    })
  }

  getBuddies() {
    return this.apollo
    .query({
      query: gql`query{
        getConnections(
          email: "${this.cookie.get('email')}",
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

}
