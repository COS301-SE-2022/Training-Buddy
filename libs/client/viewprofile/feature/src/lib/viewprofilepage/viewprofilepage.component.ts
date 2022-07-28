import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import Fuse from 'fuse.js';
import { Subject,take } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { tap } from 'rxjs';
@Component({
  selector: 'training-buddy-profile-page',
  templateUrl: './viewprofilepage.component.html',
  styleUrls: ['./viewprofilepage.component.scss'],
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
export class ViewprofilepageComponent implements OnInit {

  //buddies
  buddyCount = 0;
  @ViewChild('buddySearchBox') buddySearchBox : any;
  clearBuddiesbutton = false;
  noBuddiesResult = false;
  noBuddies = false;
  buddies! : any;
  buddiesOriginal : any;
  buddiesLoaded = false;
  ref!: AngularFireStorageReference;
  //logs
  activityCount = 0;
  @ViewChild('logSearchBox') logSearchBox : any;
  clearLogsbutton = false;
  noLogsResult = false;
  noLogs = false;
  logs : any[] = [];
  logsOriginal : any[] = [];
  logsLoaded = false;

  //fetch observables:
  eventBuddies : Subject<void> = new Subject<void>();
  eventLogs : Subject<void> = new Subject<void>();

  guestprofile = false;
  loading = true;
  toggle = true;
  email! : string;
  id! : any;
  displayUser! : any;
  currentImage! :any;



  constructor(private apollo : Apollo, private cookie : CookieService , private activated : ActivatedRoute, private router : Router, private afStorage: AngularFireStorage ){
    
    
  } 

  changeProfile(id : string) {
    this.logsLoaded = false;
    this.buddiesLoaded = false;
    this.buddyCount = 0;
    this.activityCount = 0;
    
    this.loading = true;
    // const id = this.cookie.get('id');
    
    this.router.navigate([`/profile/${id}`]);
  }

  openSheet(buddy : any) {
    console.log('open sheet');
  }

  checkSelf(id : any) {
    return this.cookie.get('id') != id;
  }

  ngOnInit(): void {


    this.activated.params.subscribe((param : any) => {
      const routerid = param?.id;
      this.id = routerid
      if (routerid == null)
        this.id = this.cookie.get('id');
        

      this.getCurrentUser().subscribe({
        next: (data : any) => {
          this.displayUser = data.data.getUser;
          this.loading = false;
          this.getData(this.displayUser.email);
          // this.ref = this.afStorage.ref("UserProfileImage/"+this.id);
          // this.ref.getDownloadURL().subscribe((downloadURL) => {
          // this.currentImage=downloadURL;
          // });
        },
      })

    })

  }

  getData(email : string) { //this is the email of the user to fetch the data for

    this.getBuddies(email).subscribe({
      next: (data : any) => {
        this.fetchImages(data.data.getConnections).then((out : any[]) => {
          this.buddies = out;
          this.buddiesOriginal = out;
        });
        this.buddiesOriginal = this.buddies;
        this.buddiesLoaded = true;
        this.buddyCount = this.buddies.length;
        if (this.buddyCount == 0) {
          this.noBuddies = true;
        }
      }
    })

    this.getActivityLogs(email).subscribe(
      {
        next: (data : any) => {
          const swap: any[] = [];
          data.data.getLogs.map((el : any) => {
            swap.push(this.convertToCard(el));
          });
          this.logs = swap;
          this.logsLoaded = true;
          this.logsOriginal = this.logs;
          this.activityCount = swap.length;
          if (this.logs.length == 0) {
            this.noLogs = true;
          }
          console.log('activities', this.logs);
        },
      }
    );

  }

  fetchImages(data : any[]) : Promise<any> {
    console.log(data);
    return new Promise<any>((res, rej) => {
     const o : any[] = [];
     data.forEach((usr : any) => {
       this.afStorage
         .ref(`UserProfileImage/${usr.id}`)
         .getDownloadURL()
         .pipe(
           tap((url : any) => {
             const image = {image : url};
             const p = {
               ...usr,
               ...image
             }
             console.log(p)
             o.push(p);
           })
         ).subscribe();
     });
     res(o);
    })
   }

  
  getCurrentUser() {
    return this.apollo
    .query({
      query: gql`query{getUser(
        UserID:"${this.id}"
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
          buddies
      }
      }
      `,
      // //pollInterval: 25000
    })
    
  }

  getActivityLogs(email : string) {
    return this.apollo
      .query ({
        query: gql`query{getLogs(
          email:"${ email }" 
        ){
          user,
          activityType, 
          dateComplete,
          distance,
          name,
          speed,
          time
        }
        }
        `,
      })
  }
  
  getBuddies(email : string) {
    return this.apollo
    .query({
      query: gql`query{
        getConnections(
          email: "${ email }",
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
        id
      }
      }
      `,
    });
  }

  convertToCard(data : any) : any {
    const date = new Date(data.dateComplete);
    return {
      name: data.name,
      type: this.type(data.activityType),
      distance: this.metersToKm(data.distance),
      speed: this.convertSpeed(data),
      time: this.secondsToString(data.time),
      date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
  }

  type(data : string) : string {
    if (data == 'Running') 
      return 'Run';
    if (data == 'Riding')
      return 'Ride';
    if (data == 'Swimming')
      return 'Swim';
    return 'Weights';
  }

  convertSpeed(data : any) : string {

    const mps = data.speed;
    if (data.activityType == 'Running') {
      let minperkm =  16.666666666667 / Number(mps);
      let min = 0;
      while (minperkm > 1) {
        min++;
        minperkm--;
      }
      const secs = Math.round((((Math.abs(minperkm) * 100) / 100) * 60));
      if (secs.toString().length != 1)
        return min.toString() + ':' + secs.toString() + ' min/km';
      return min.toString() + ':' + secs.toString() + '0' + ' min/km';
    }

    if (data.activityType == 'Riding') {
      return (Math.round(((mps * 3.6) * 100)) / 100).toString() + ' km/h';
    }

    if (data.activityType == 'Swimming') {
      return '2:00 min/100m';
    }

    return ''; //Weight Lifting
  }

  metersToKm(data : any) : string {
    return (Math.round(Number(data / 1000) * 100) / 100).toString() + 'km';
  }

  secondsToString(data : number) : string {
    data /= 60 //convert to minutes
    let hours = 0;
    while (data >= 60) {
      hours++;
      data -= 60;
    }
    const mins = Math.round(data);
    if (hours == 0)
      return `${mins} mins`;
    return `${hours} hours ${mins} mins`;
  }

  getSportString(data : any) : string {
    if (data?.metrics == null) return '';
    const output = [];
    if (data?.metrics.run) output.push('Run');
    if (data?.metrics.ride) output.push('Ride');
    if (data?.metrics.swim) output.push('Swim');
    if (data?.metrics.lift) output.push('Weights');
    let retString = "";
    for (let i = 0; i < output.length; i++) {
      retString += output[i];
      if (i < output.length - 1) retString += ', ';
    }
    return retString;
  }

  toggleBuddies() {
    this.toggle = true;
  }

  toggleLogs() {
    this.toggle = false;
  }

  //code for the buddies//
  showBuddiesClear() {
    this.clearBuddiesbutton = true;
  }

  hideBuddiesClear() {
    this.clearBuddiesbutton = false;
    // this.input.nativeElement.value = '';
    // this.buddies = this.buddiesOriginal;
  }

  clearBuddiesSearch() {
    this.clearBuddiesbutton = false;
    this.buddySearchBox.nativeElement.value = '';
    this.buddies = this.buddiesOriginal;
  }

  searchBuddies(event : any) {

    const search = event.value;

    if (search.length == 0) {
      this.buddies = this.buddiesOriginal;
      this.noBuddiesResult = false;
      return;
    }

    const swap = new Fuse(this.buddiesOriginal, {
      keys: [
        'userName',
        'userSurname',
        'location'
      ]
    }).search(
      search
    );

    this.buddies = [];
    swap.map((el : any) => {
      this.buddies.push(el.item);
    })

    if (this.buddies.length == 0) {
      this.noBuddiesResult = true;
    } else {
      this.noBuddiesResult = false;
    }

  }

  currentProfile() : boolean {
    const paramId = this.activated.snapshot.paramMap.get('id');
    if (paramId == null)
      return true;
    if (paramId == this.cookie.get('id'))
      return true;
    return false;
  }

  //code for logs//
  searchLogs(event : any) {

    const search = event.value;

    if (search.length == 0) {
      this.logs = this.logsOriginal;
      this.noLogsResult = false;
      return;
    }

    const hits = new Fuse(this.logsOriginal, {
      keys: [
        'name',
        'type',
        'distance',
        'speed',
        'date',
        'time'
      ]
    }).search(
      search
    );

    this.logs = [];
    hits.map((el : any) => {
      this.logs.push(el.item);
    });

    if (this.logs.length == 0) {
      this.noLogsResult = true;
    } else {
      this.noLogsResult = false;
    }

  }

  showLogsClear() {
    this.clearLogsbutton = true;
  }

  hideLogsClear() {
    this.clearLogsbutton = false;
    // this.input.nativeElement.value = '';
    // this.logList = this.logListOriginal;
  }

  clearLogsSearch() {
    this.clearLogsbutton = false;
    this.logSearchBox.nativeElement.value = '';
    this.logs = this.logsOriginal;
  }

}
