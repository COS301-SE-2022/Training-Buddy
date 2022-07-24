import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'training-buddy-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  // constructor() { }

  ngOnInit(): void {
    console.log('it works');
  }

}
