import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'training-buddy-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  img : string;

  constructor() {
    this.img = 'https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';
  }

  ngOnInit(): void {
    return;
  }

}
