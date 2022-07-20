import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'training-buddy-view-schedule',
  templateUrl: './viewschedule.component.html',
  styleUrls: ['./viewschedule.component.scss']
})
export class ViewscheduleComponent implements OnInit {

  // constructor() { }
  upcomingEvents = false;
  loading = true;
  constructor(private apollo : Apollo, private cookie : CookieService , private activated : ActivatedRoute, private router : Router){
  } 
  ngOnInit(): void {
    return;
  }

  getData(email: string){ //this gets all the scheduled workouts
    //to do api call to get the schedule workouts

  }

  convertToCard(data: any) : any {
    //to do write function to convert the data to a card
  }

}
