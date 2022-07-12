import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Fuse from 'fuse.js';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'training-buddy-log-list',
  templateUrl: './loglist.component.html',
  styleUrls: ['./loglist.component.scss'],
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
export class LoglistComponent implements OnInit {

  @ViewChild('inputbox') input : any;

  @Input() data : any;

  logList : any[] = [];
  logListOriginal : any[] = [];
  nologs = false;
  clearbutton = false;
  noresult = false;

  constructor(private cookie : CookieService) { }

  ngOnInit(): void {
    // console.log('log list data', JSON.parse(this.data));
    // console.log('here in log list')
    this.logList = JSON.parse(this.data);
    this.logListOriginal = this.logList;
    if (this.logList.length == 0) {
      this.nologs = true;
    }
  }

  search(event : any) {
    const search = event.value;

    if (search.length == 0) {
      this.logList = this.logListOriginal;
      return;
    }

    const hits = new Fuse(this.logListOriginal, {
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

    this.logList = [];
    hits.map((el : any) => {
      this.logList.push(el.item);
    });

    if (this.logList.length == 0) {
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
    // this.logList = this.logListOriginal;
  }

  clearSearch() {
    this.clearbutton = false;
    this.input.nativeElement.value = '';
    this.logList = this.logListOriginal;
  }

}
