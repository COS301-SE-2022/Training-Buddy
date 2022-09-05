import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGaurdService } from './auth-gaurd.service';

@Component({
  selector: 'training-buddy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title='client'
  constructor(private auth : AuthGaurdService, private router : Router, private activated : ActivatedRoute) {
    auth.authStatus.subscribe((val) => {
      if (!val) {
        //user tried accing a protercted route and was not logged in:
        router.navigate(['/login']);
      }
    });


  }

}
