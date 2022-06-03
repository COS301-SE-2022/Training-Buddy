import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'training-buddy-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(@Inject(Router) private router : Router) { }

  ngOnInit(): void {
    console.log();
  }

  route(path : string) {
    this.router.navigate([path]);
  }

}
