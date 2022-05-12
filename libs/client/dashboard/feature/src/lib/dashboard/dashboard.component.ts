import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'training-buddy-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  //mock arrays (replace with api data)
  requests : request[] = [];
  buddies : buddy[] = [];

  constructor() { 
    //mock requests:
    for (let i = 0; i < 30; i++) {
      this.requests.push(new request('111', 'John', 'Smith', 'Hatfield'));
    }
    //mock buddies:
    for (let i = 0; i < 10; i++) {
      this.buddies.push(new buddy('121', 'Sue', 'Jones', 'Hatfield'));
    }
  }

  ngOnInit(): void {
    console.log('');
  }

}

//for testing with mock data...
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