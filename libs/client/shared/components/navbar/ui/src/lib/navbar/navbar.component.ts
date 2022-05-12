import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'training-buddy-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  route(path : string) {
    alert();
  }

}
