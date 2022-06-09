import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'training-buddy-profile-page',
  templateUrl: './viewprofilepage.component.html',
  styleUrls: ['./viewprofilepage.component.scss']
})
export class ViewprofilepageComponent implements OnInit {

  constructor(private apollo : Apollo) { }

  ngOnInit(): void {
    this.getActivityLogs().subscribe(
      {
        next: (res : any) => {
          console.log(res.data.getLogs);
        },
      }
    )
  }

  getActivityLogs() {
    const email = 'muziwandile@gmail.com';
    return this.apollo
        .query ({
          query: gql`query{getLogs(
            email:"${email}" 
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
