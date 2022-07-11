import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import Fuse from 'fuse.js';
import { Apollo, gql } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'training-buddy-buddies-list',
  templateUrl: './buddylist.component.html',
  styleUrls: ['./buddylist.component.scss'],
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
export class BuddylistComponent implements OnInit {

  @ViewChild('inputbox') input : any;

  buddies! : any;
  buddiesOriginal! : any;
  nobuddies = false;
  loading = true;
  clearbutton = false;
  currentImage = 'https://images.unsplash.com/photo-1512941675424-1c17dabfdddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';

  constructor(private apollo : Apollo, private cookie : CookieService, private activated : ActivatedRoute) { 
    // constructor(private apollo : Apollo, private cookie : CookieService, private sheet : MatBottomSheet) { 
    const id = this.activated.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getBuddies().subscribe({
      next: (data : any) => {
        this.buddies = data.data.getConnections;
        this.buddiesOriginal = this.buddies;
        console.log(this.buddies);
        if (this.buddiesOriginal.length == 0) {
          this.nobuddies = true;
        }
        this.loading = false;
      }
    })
  }

  openSheet() {
    // this.sheet.open();
    alert('this will open action sheet')
  }

  search(event : any) {
    const search = event.value;

    if (search.length == 0) {
      this.buddies = this.buddiesOriginal;
      return;
    }

    this.buddies = new Fuse(this.buddiesOriginal, {
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

  }

  getBuddies() {
    return this.apollo
    .query({
      query: gql`query{
        getConnections(
          email: "${this.cookie.get('email')}",
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

  showClear() {
    this.clearbutton = true;
  }

  hideClear() {
    this.clearbutton = false;
    this.input.nativeElement.value = '';
    this.buddies = this.buddiesOriginal;
  }

}
