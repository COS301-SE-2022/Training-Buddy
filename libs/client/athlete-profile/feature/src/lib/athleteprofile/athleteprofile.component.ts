import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, ComponentFactoryResolver, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'training-buddy-athlete-profile',
  templateUrl: './athleteprofile.component.html',
  styleUrls: ['./athleteprofile.component.scss'],
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
export class AthleteprofileComponent implements OnInit {

  img : string;
  email : string;
  //error flags:
  noActivityChosen : boolean;

  //form
  prefFrm! : FormGroup;
  frmBuilder! : FormBuilder;

  //trainig radius
  radius : number;

  update = false;
  sliderDefault = 2;

  sliderMove(value: any) {
    this.radius = value;
  }

  constructor(private frm : FormBuilder, private apollo : Apollo, @Inject(Router) private router : Router, private cookieService: CookieService, private activated : ActivatedRoute, private cookie : CookieService) { 

    this.img = 'https://images.unsplash.com/photo-1512941675424-1c17dabfdddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';
    
    const flag = this.activated.snapshot.paramMap.get('flag');

    if (flag != null) {
      this.update = true;
      this.img = '';
    }

    //initializations:
    this.frmBuilder = frm;
    this.noActivityChosen = false;
    this.radius = 2;
    this.email = this.cookieService.get('email');
  }

  ngOnInit(): void {

    this.prefFrm = this.frmBuilder.group({
      running: [''],
      riding: [''],
      swimming: [''],
      weightLifting: [''],
      bio: ['', [Validators.required, Validators.minLength(30)]]
    });

    //check if this is signup or update:
    if (this.update) {
      this.getCurrentUser().subscribe({
        next: (data : any) => {

          const user = data.data.getOne;
          const metrics = user.metrics;
          this.radius = user.distance;
          this.sliderDefault = user.distance;
          const bio = user.bio;

          this.prefFrm.setValue({
            running: metrics.run,
            riding: metrics.ride,
            swimming: metrics.swim,
            weightLifting: metrics.lift,
            bio: bio
          })

        }
      })
    }

  }

  getCurrentUser() {
    return this.apollo
    .query({
      query: gql`query{getOne(
        email:"${this.email}" 
      ){
          userName,
          userSurname,
          location,
          longitude,
          latitude,
          stravaToken,
          dob,
          gender,
          email,
          cellNumber,
          bio,
          metrics{lift , ride , run , swim},
          buddies,
          distance
      }
      }
      `,
      // //pollInterval: 25000
    })
    
  }

  updateError() {
    const running = this.prefFrm.controls['running'].value || false;
    const riding = this.prefFrm.controls['riding'].value || false;
    const swimming = this.prefFrm.controls['swimming'].value || false;
    const weightLifting = this.prefFrm.controls['weightLifting'].value || false;
    this.noActivityChosen = false;
    if (!(running || riding || swimming || weightLifting)) {
      this.noActivityChosen = true;
    }
  }

  save() {

    const running = this.prefFrm.controls['running'].value || false;
    const riding = this.prefFrm.controls['riding'].value || false;
    const swimming = this.prefFrm.controls['swimming'].value || false;
    const weightLifting = this.prefFrm.controls['weightLifting'].value || false;
    const bio = this.prefFrm.controls['bio'].value;
    this.noActivityChosen = false;
    if (!(running || riding || swimming || weightLifting)) {
      this.noActivityChosen = true;
    }

    if (this.prefFrm.invalid) {
      return;
    }

    //////////////////
    //TESTING VALUES
    // console.log(running);
    // console.log(riding);
    // console.log(swimming);
    // console.log(weightLifting);
    // console.log(bio);
    //////////////////

    //form is valid here

    //TODO: Complete API call
    // this.router.navigate(['/uploadimage']);

    if (this.update) {

      this.updateProfile(this.email, running, riding, swimming, weightLifting, bio , this.radius).subscribe({
        next: () => {
          this.router.navigate(['/settings']);
        }
      })

      return;
    }

    this.setProfile(this.email, running, riding, swimming, weightLifting, bio , this.radius).subscribe({
      next: () => {
        this.router.navigate(['/uploadimage']);
      }
    });

  }

  updateProfile(email : string, running : boolean, riding : boolean, swimming : boolean, weightLifiting : boolean, bio : string , distance: number ) {
    return this.apollo
      .mutate ({
        mutation: gql`

        `,
      });
  }

  setProfile(email : string, running : boolean, riding : boolean, swimming : boolean, weightLifiting : boolean, bio : string , distance: number ) {
    return this.apollo
      .mutate({
        mutation: gql`mutation{
        userConfig(userConfig:{
          email : "${email}",
          distance : ${distance},
          riding: ${riding},
          running: ${running},
          swimming: ${swimming},
          weightLifting: ${weightLifiting},
          bio: "${bio}",
        }){
          message
        }
      }
      `,
      });
   }


}
