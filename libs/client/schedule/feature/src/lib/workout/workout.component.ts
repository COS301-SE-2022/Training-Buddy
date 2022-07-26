import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'training-buddy-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  // constructor() { }
  constructor(private activated : ActivatedRoute){
  } 
  
  ngOnInit(): void {
    console.log('it works');
    this.activated.params.subscribe((param : any) => {
      const routerid = param?.workoutID;
     console.log(routerid);
    })
  }

}
