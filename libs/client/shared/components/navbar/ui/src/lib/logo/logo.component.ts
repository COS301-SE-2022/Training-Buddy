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
    return;
  }
  
  ngOnInit(): void {
    this.height = 100;
    console.log(this.dark);
    this.f = this.dark == 'true';
    console.log(this.f);
    return;
  }

  ngAfterViewInit() {
    
    this.svgChild.nativeElement.style.height = this.height;

  }

}
