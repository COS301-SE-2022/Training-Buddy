import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'training-buddy-back-navbar',
  templateUrl: './backnavbar.component.html',
  styleUrls: ['./backnavbar.component.scss']
})
export class BacknavbarComponent implements OnInit {

  @Input() title : string;

  constructor(private location : Location) {
    this.title = '';
  }

  ngOnInit(): void {
    return;
  }

  back() {
    this.location.back();
  }

}
