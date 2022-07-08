import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'training-buddy-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private cookie : CookieService, private router : Router) { 
  }

  ngOnInit(): void {
    return;
  }

  logout() {
    this.cookie.deleteAll();
    this.router.navigate(['login']);
  }

}
