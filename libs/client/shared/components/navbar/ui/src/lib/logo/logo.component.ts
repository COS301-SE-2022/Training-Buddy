import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'training-buddy-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  @Input() height : any;

  @ViewChild('svg') svgChild : any;

  vert = false;
  blck = false;

  constructor() {
    this.height = 100;
  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    
    this.svgChild.nativeElement.style.height = this.height;

  }

}
