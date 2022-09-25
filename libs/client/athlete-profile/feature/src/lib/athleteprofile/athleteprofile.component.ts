import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  //ratings
  runRating = 0 ;
  swimRating = 0;
  rideRating = 0;
  liftRating = 0;
  //check box values:
  running : boolean;
  swimming : boolean;
  riding : boolean;
  lifting : boolean;


  update = false;
  sliderDefault = 2;

  sliderMove(value: any) {
    this.radius = value;
  }

  moveRun(value: any) {
    this.runRating = value;
  }

  moveRide(value: any) {
    this.rideRating = value;
  }

  moveSwim(value: any) {
    this.swimRating = value;
  }

  moveLift(value: any) {
    this.liftRating = value;
  }

  toggleRunning() {
    this.running = !this.running;
    if(!this.running){
      this.runRating = 0;
    }
  }

  toggleRiding() {
    this.riding = !this.riding;
    if(!this.riding){
      this.rideRating = 0;
    }
  }

  toggleSwimming() {
    this.swimming = !this.swimming;
    if(!this.swimming){
      this.swimRating = 0;
    }
  }

  toggleLifting() {
    this.lifting = !this.lifting;
    if(!this.lifting){
      this.liftRating = 0;
    }

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
    this.runRating = 0;
    this.liftRating = 0;
    this.swimRating = 0;
    this.rideRating = 0;
    this.email = this.cookieService.get('email');
    this.running = false;
    this.riding = false;
    this.swimming = false;
    this.lifting = false;

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
          if(metrics.run>0){
            this.running = true;
            this.runRating = metrics.run;
          }
          if(metrics.ride>0){
            this.riding = true;
            this.rideRating = metrics.ride;
          }
          if(metrics.swim>0){
            this.swimming = true;
            this.swimRating = metrics.swim;
          }
          if(metrics.lift>0){
            this.lifting = true;
            this.liftRating = metrics.lift;
          }
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

    this.setProfile(this.email, bio , this.radius).subscribe({
      next: () => {
        this.router.navigate(['/uploadimage']);
      }
    });

  }

  updateProfile(email : string, running : boolean, riding : boolean, swimming : boolean, weightLifiting : boolean, bio : string , distance: number ) {
    return this.apollo
      .mutate ({
        mutation: gql`
        mutation{
          userConfig(userConfig:{
            email : "${email}",
            distance : ${distance},
            riding: ${this.rideRating},
            running: ${this.runRating},
            swimming: ${this.swimRating},
            weightLifting: ${this.liftRating},
            bio: "${bio}",
          }){
            message
          }
        }

        `,
      });
      
  }

  setProfile(email : string, bio : string , distance: number ) {
    return this.apollo
      .mutate({
        mutation: gql`mutation{
        userConfig(userConfig:{
          email : "${email}",
          distance : ${distance},
          riding: ${this.rideRating},
          running: ${this.runRating},
          swimming: ${this.swimRating},
          weightLifting: ${this.liftRating},
          bio: "${bio}",
        }){
          message
        }
      }
      `,
      });
   }


}
