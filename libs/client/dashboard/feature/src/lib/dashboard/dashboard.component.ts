import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'training-buddy-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  //mock arrays (replace with api data)
  requests : request[] = [];
  buddies : buddy[] = [];

  img : string;

  email = 'muziwandile@gmail.com';

  constructor(private apollo : Apollo) { 
    this.img = 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80';
    //mock requests:
    for (let i = 0; i < 2; i++) {
      this.requests.push(new request('111', 'John', 'Smith', 'Hatfield'));
    }
    //mock buddies:
    for (let i = 0; i < 10; i++) {
      this.buddies.push(new buddy('121', 'Sue', 'Jones', 'Hatfield'));
    }
  }

  ngOnInit(): void {
    
    this.getBuddieRecommended().subscribe({
      next: (data : any) => {
        console.log(data);
        data.data.findAll.map((el : any) => {
          // this.buddies.push(new buddy(el.email, el.name, el.surname, ''))
        });
      }
    });

    this.getPendingRequests().subscribe({
      next: (data: any) => {
        // console.log(data);
      }
    })
    

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
          metric{lift , run , swim , ride},
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
          metric{lift , ride , run , swim},
          buddies
        }
        }
         
        `,
      });

  }

}

//FOR MOCKING
export class request {

  fromid: string | undefined;
  image = "";
  name: string | undefined;
  surname: string | undefined;
  location: string | undefined;

  constructor(fromid : string, name : string, surname : string, loc : string) {
    this.fromid = fromid;
    this.name = name;
    this.surname = surname;
    this.location = loc;
  }

}

export class buddy {

  id: string | undefined;
  image = "";
  name: string | undefined;
  surname: string | undefined;
  location: string | undefined;

  constructor(id : string, name : string, surname : string, loc : string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.location = loc;
  }

}

