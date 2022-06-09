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
    this.getActivityLogs().then(res => {
      console.log(res);
    });
  }

  getActivityLogs() {
    const email = "";
    return new Promise((resolve, _) => {
      if (!(this.apollo.client === undefined))
      this.apollo
        .query ({
          query: gql`query{getLogs(
            email:"${email}" 
          )
          }
            
          `,
        })
        .subscribe ((result) => {
         const res: any  = result
          resolve(res.data.getLog);
        });
    });
  }

}
