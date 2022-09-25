import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'training-buddy-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  @Input() height : any;
  @Input() dark : any;
  f = false;
  @ViewChild('svg') svgChild : any;

  vert = false;
  blck = false;

  constructor() {
    this.height = 50;
    return;
  }
  
  ngOnInit(): void {
    this.f = this.dark == 'true';
    return;
  }

  ngAfterViewInit() {
    
    this.svgChild.nativeElement.style.height = this.height;

  }

}
