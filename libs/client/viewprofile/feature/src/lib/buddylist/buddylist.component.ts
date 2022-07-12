import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import Fuse from 'fuse.js';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
// import { MatBottomSheet } from '@angular/material/bottom-sheet';

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

  @Input() data : any;

  buddies! : any;
  buddiesOriginal! : any;
  nobuddies = false;
  clearbutton = false;
  currentImage = 'https://images.unsplash.com/photo-1512941675424-1c17dabfdddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';
  noresult = false;

  constructor(private router : Router, private cookie : CookieService) { 
    // constructor(private apollo : Apollo, private cookie : CookieService, private sheet : MatBottomSheet) { 
  }
  
  viewOtherProfile(id : string) {
    this.router.navigate([`/profile/${id}`]);
  }

  checkSelf(id : string) : boolean {
    // console.log(id, '==', this.cookie.get('id'), id == this.cookie.get('id'))
    return id != this.cookie.get('id');
  }

  ngOnInit(): void {
    this.buddies = JSON.parse(this.data);
    this.buddiesOriginal = this.buddies;
    if (this.buddiesOriginal.length == 0) {
      this.nobuddies = true;
    }
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
      this.noresult = true;
    } else {
      this.noresult = false;
    }

  }

  showClear() {
    this.clearbutton = true;
  }

  hideClear() {
    this.clearbutton = false;
    // this.input.nativeElement.value = '';
    // this.buddies = this.buddiesOriginal;
  }

  clearSearch() {
    this.clearbutton = false;
    this.input.nativeElement.value = '';
    this.buddies = this.buddiesOriginal;
  }

}
