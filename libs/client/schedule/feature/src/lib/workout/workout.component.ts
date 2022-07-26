import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Router } from 'express';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'training-buddy-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  // constructor() { }
  // constructor(private apollo : Apollo, private cookie : CookieService , private activated : ActivatedRoute, private router : Router){
  // } 
  
  ngOnInit(): void {
    console.log('it works');
    // this.activated.params.subscribe((param : any) => {
    //   const routerid = param?.workoutID;
    //  console.log(routerid);
    // })
  }

}
