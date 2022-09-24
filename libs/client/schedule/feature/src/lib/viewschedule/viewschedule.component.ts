import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'training-buddy-view-schedule',
  templateUrl: './viewschedule.component.html',
  styleUrls: ['./viewschedule.component.scss'],
   animations: [

    trigger(
      'swipeRight', [
        transition(':enter', [
          animate(120, keyframes([
            style({
              transform: 'translate3d(-100%, 0, 0)',
              visibility: 'visible'
            }),
            style({
              transform: 'translate3d(0, 0, 0)'
            })
        ]))
        ]),
        transition(':leave', [

        ])
      ]
    ),

    trigger(
      'swipeLeft', [
        transition(':enter', [
          animate(120, keyframes([
            style({
              transform: 'translate3d(100%, 0, 0)',
              visibility: 'visible'
            }),
            style({
              transform: 'translate3d(0, 0, 0)'
            })
        ]))
        ]),
        transition(':leave', [

        ])
      ]
    ),

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
export class ViewscheduleComponent implements OnInit {

  // constructor() { }
  upcomingEvents = false;
  pastEvents = false;
  loading = true;
  user!: any;
  workouts: any;
  workoutInvites: any;
  workoutHistory: any;
  invitesAvailable = false;
  workoutsLoaded = false;
  workoutsCount = 0;
  email : string;
  toggle = true;

  constructor(private apollo : Apollo, private cookie : CookieService , private activated : ActivatedRoute, private router : Router, private cookieService:CookieService,private firestore : AngularFirestore, private afStorage: AngularFireStorage){
    this.email = this.cookieService.get('email');
  }
  ngOnInit(): void {
   
    this.getData(this.email);
    this.liveData(this.email);


    
  }
  liveData(email: string){
    this.firestore
    .collection('WorkoutInvites', ref => ref.where('receivers', 'array-contains', this.email))
    .valueChanges()
    .subscribe((curr : any) => {
      const swap: any[]= [];
      curr.forEach( (element : any) => {
        this.getWorkout(element.workout, this.email).subscribe( (res : any) => {
          swap.push(this.convertInvitedToCard2(res.data.getWorkout));
          if(swap.length == 0){
            return;
          }
          swap.sort(function(a,b){
            return a.startDate.timestamp - b.startDate.timestamp;
          });
          const dated: any[][] = [[]];
          let x = 0;
          let currentday = swap[0].startDate.day;
    
          for(let w = 0; w < swap.length; w++  ){
            if(swap[w].startDate.day == currentday){
              dated[x].push(swap[w]);
            }
            else{
              currentday = swap[w].startDate.day;
              x++;
              const temp: any[] = [];
              dated.push(temp)
              dated[x].push(swap[w]);
            }
          }
          this.invitesAvailable = false;
          this.workoutInvites=[]
          this.workoutInvites = dated;
          if(this.workoutInvites.length != 0){
            this.invitesAvailable = true;
          }
         
        })
      })
      this.invitesAvailable = false;
      this.workoutInvites=[]
    }

    )
    this.firestore
    .collection('ScheduledWorkouts', ref => ref.where('participants', 'array-contains', this.email))
    .valueChanges()
    .subscribe((curr : any) => {
      const swap: any[] = [];
      curr.map((el : any) => {
        if(el.startTime > Math.floor(Date.now()/1000)){
          swap.push(this.convertWorkoutToCard(el));
        }
     
     
      });
      if(swap.length != 0){
        swap.sort(function(a,b){
          return a.startDate.timestamp - b.startDate.timestamp;
        });

        const dated: any[][] = [[]];
        let x = 0;
        let currentday = swap[0].startDate.day;
        for(let w = 0; w < swap.length; w++  ){
          if(swap[w].startDate.day == currentday){
            dated[x].push(swap[w]);
          }
          else{
            currentday = swap[w].startDate.day;
            x++;
            const temp: any[] = [];
            dated.push(temp)
            dated[x].push(swap[w]);
          }
      
        }
        this.workouts = dated;
        this.workoutsLoaded = true;
        this.workoutsCount = this.workouts.length;
        if (this.workoutsCount != 0) {
          this.upcomingEvents = true;
        }
      }
      this.loading = false;
    })
    this.firestore
    .collection('ScheduledWorkouts', ref => ref.where('participants', 'array-contains', this.email))
    .valueChanges()
    .subscribe((curr : any) => {
      const swap: any[] = [];
      curr.map((el : any) => {
        if(el.startTime <  Math.floor(Date.now()/1000)){
          swap.push(this.convertWorkoutToCard(el));
        }
      });
      if(swap.length != 0){
        swap.sort(function(a,b){
          return b.startDate.timestamp - a.startDate.timestamp;
        });

        const dated: any[][] = [[]];
        let x = 0;
        let currentday = swap[0].startDate.day;
        for(let w = 0; w < swap.length; w++  ){
          if(swap[w].startDate.day == currentday){
            dated[x].push(swap[w]);
          }
          else{
            currentday = swap[w].startDate.day;
            x++;
            const temp: any[] = [];
            dated.push(temp)
            dated[x].push(swap[w]);
          }
      
        }
        this.workoutHistory = dated;
        this.workoutsCount = this.workouts.length;
        if (this.workoutsCount != 0) {
          this.pastEvents = true;
        }
      }
      this.loading = false;
    })
  

  }
  convertInvitedToCard2(data: any) : any{
    return{
      organiser: data.organiser,
      name: data.title,
      id: data.id,
      startPoint: data.startPoint,
      startDate: this.startDateTime(data.startTime),
      image: this.image(data.activityType)
    }
  }
  getWorkout(id:string , email:string){
    return this.apollo
    .query({
      query: gql`
        query{
          getWorkout(workoutID: "${ id }" , email: "${ email }"){
            title,
            id,
            startTime,
            activityType,
            startPoint,
            proposedDistance,
            proposedDuration,
            organiser,
            }
        }`,
    })
  }
  getWorkouts(email: string){
    return this.apollo
    .query({
      query: gql`
        query{
          getScheduleWorkout(email: "${ email }"){
            title,
            id,
            startTime,
            activityType,
            startPoint,
            proposedDistance,
            proposedDuration
            }
        }`,
    })
  }
  getWorkoutHistory(email: string){
    return this.apollo
    .query({
     query: gql`
        query{
          getWorkoutHistory(email: "${ email }"){
            title,
            id,
            startTime,
            activityType,
            startPoint,
            proposedDistance,
            proposedDuration
            }
        }`,
    })
  }
  getInvites(email: string){
    const val2 = this.apollo
    .query({
      query: gql`
       query{
          getIncomingInvites(email: "${ email }"){
            sender,
            receivers,
            workout{
              title,
              id,
              startTime,
              organiser,
              participants{
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
                id,
                bio,
                metrics{
                  lift,
                  run,
                  swim,
                  ride
                },
                buddies,
                distance
              }
              activityType,
              startPoint,
              proposedDistance,
              proposedDuration
            }
          }
        }
      `
    })
    return val2
  }

  getUserName(email: string){
    return this.apollo
    .query({
      query: gql`
        query{
          getOne(email: "${ email }"){
            userName
          }
        }`
    })
  }
  getData(email: string){
    this.getInvites(email).subscribe({
      next: (data: any) =>{
        const swap: any[]= [];
        data.data.getIncomingInvites.map((el : any) => {

          swap.push(this.convertInvitedToCard(el));
        });
        //sort the data.
        if(swap.length == 0){
          return;
        }
        swap.sort(function(a,b){
          return a.startDate.timestamp - b.startDate.timestamp;
        });

        const dated: any[][] = [[]];
        let x = 0;
        let currentday = swap[0].startDate.day;

        for(let w = 0; w < swap.length; w++  ){
          if(swap[w].startDate.day == currentday){
            dated[x].push(swap[w]);
          }
          else{
            currentday = swap[w].startDate.day;
            x++;
            const temp: any[] = [];
            dated.push(temp)
            dated[x].push(swap[w]);
          }
        }
        this.workoutInvites = dated;
        if(this.workoutInvites.length != 0){
          this.invitesAvailable = true;
        }

      }
    })
    this.getWorkouts(email).subscribe({
      next: (data : any) => {
          const swap: any[] = [];
          data.data.getScheduleWorkout.map((el : any) => {
            swap.push(this.convertWorkoutToCard(el));
          });
          if(swap.length != 0){
            swap.sort(function(a,b){
              return a.startDate.timestamp - b.startDate.timestamp;
            });

            const dated: any[][] = [[]];
            let x = 0;
            let currentday = swap[0].startDate.day;

            for(let w = 0; w < swap.length; w++  ){
              if(swap[w].startDate.day == currentday){
                dated[x].push(swap[w]);
              }
              else{
                currentday = swap[w].startDate.day;
                x++;
                const temp: any[] = [];
                dated.push(temp)
                dated[x].push(swap[w]);
              }
            }
            this.workouts = dated;
            this.workoutsLoaded = true;
            this.workoutsCount = this.workouts.length;
            if (this.workoutsCount != 0) {
              this.upcomingEvents = true;
            }
          }
          this.loading = false;
      }
    })
    this.getWorkoutHistory(email).subscribe({
      next: (data : any) => {
          const swap: any[] = [];
          data.data.getWorkoutHistory.map((el : any) => {
            swap.push(this.convertWorkoutToCard(el));
          });
          if(swap.length != 0){
            swap.sort(function(a,b){
              return b.startDate.timestamp - a.startDate.timestamp;
            });

            const dated: any[][] = [[]];
            let x = 0;
            let currentday = swap[0].startDate.day;
            for(let w = 0; w < swap.length; w++  ){
              if(swap[w].startDate.day == currentday){
                dated[x].push(swap[w]);
              }
              else{
                currentday = swap[w].startDate.day;
                x++;
                const temp: any[] = [];
                dated.push(temp)
                dated[x].push(swap[w]);
              }
            }
            this.workoutHistory = dated;
            if(this.workoutHistory.length != 0) {
              this.pastEvents= true;
            }
          }
          this.loading = false;
      }

    })
  }
  convertInvitedToCard(data: any) : any{
    return{
      organiser: data.sender,
      name: data.workout.title,
      id: data.workout.id,
      startPoint: data.workout.startPoint,
      startDate: this.startDateTime(data.workout.startTime),
      image: this.image(data.workout.activityType)
    }
  }
  convertWorkoutToCard(data: any) : any {
    //to do write function to convert the data to a card
    return{
      name: data.title,
      id: data.id,
      startPoint: data.startPoint,
      startDate: this.startDateTime(data.startTime),
      image: this.image(data.activityType)

    }
  }


  startDateTime(data: string): any{
    //write a function that returns the date and time
    const date = new Date(Number(data) * 1000);
    const datepipe: DatePipe = new DatePipe('en-US')
    const formattedDate = datepipe.transform(date, 'HH:mm');
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return{
      timestamp: data,
      day: date.getDate(),
      month:  months[date.getMonth()],
      year: date.getFullYear(),
      time: formattedDate,
    }
  }

  image(data: string): string{
    // return this.currentImage;
    if (data == 'run')
    return "https://img.icons8.com/ios/50/000000/running.png";
    if (data == 'ride')
      return "https://img.icons8.com/ios-filled/50/000000/bicycle.png";
    if (data == 'swim')
      return "https://img.icons8.com/ios/50/000000/swimming.png";
    return "https://img.icons8.com/ios/50/000000/dumbbell--v1.png";
  }

  fullWorkoutDetails(workoutID: string){
    this.router.navigate([`schedule/${workoutID}`]);
  }

  acceptInvite(email: string, workoutID: string){
    this.apollo
    .mutate({
      mutation: gql`
        mutation{
          acceptInvite(
            email: "${ this.email }",
            sender: "${ email }",
            workoutID: "${ workoutID }"
          ){
          message
          }
      }
    `,
    }).subscribe({
      next: () => {
        this.workoutInvites.map((el : any, i : number) => {
          if (el.id == workoutID) {
            this.workoutInvites.splice(i, 1);
          }
        });
      }
    });


  }
  rejectInvite(email: string, workoutID: string){
    this.apollo
    .mutate({
      mutation: gql`
        mutation{
          rejectInvite(
            email: "${ this.email }",
            sender: "${ email }",
            workoutID: "${ workoutID }"
          ){
          message
          }
      }
    `,
    }).subscribe({
      next: () => {
        // this.workoutInvites.map((el : any, i : number) => {
        //   if (el.organiserEmail== email) {
        //     this.workoutInvites.splice(i, 1);
        //   }
        // });
        this.getData(this.email);
      }
    });
  }


  toggleUpcomingWorkouts(){
    this.toggle = true;
  }

  toggleWorkoutHistory(){
    this.toggle = false;
  }

}
