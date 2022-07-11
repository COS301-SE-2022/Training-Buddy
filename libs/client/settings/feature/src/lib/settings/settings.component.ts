import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'training-buddy-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [

    trigger(
      'fadeIn', [
        transition(':enter', [
          animate(120, keyframes([
            style({
              opacity: '0'
            }),
            style({
              opacity: '1'
            })
          ]))
        ])
      ]
    )
    
  ]
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
