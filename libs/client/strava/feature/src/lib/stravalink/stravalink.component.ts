import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'training-buddy-strava-link',
  templateUrl: './stravalink.component.html',
  styleUrls: ['./stravalink.component.scss']
})
export class StravalinkComponent implements OnInit {

  img : string

  constructor() {
    this.img = 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80';
  }

  ngOnInit(): void {
  }

}
