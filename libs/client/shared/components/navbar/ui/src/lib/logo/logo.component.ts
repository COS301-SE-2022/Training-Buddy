import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'training-buddy-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  @Input() height : number;
  @Input() width : number;
  @ViewChild('svg') svgChild : any;

  constructor() {
    this.height = 100;
    this.width = 74.29228361827322;
  }

  ngOnInit(): void {
    return;
  }

  ngAfterViewInit() {
    
    this.svgChild.nativeElement.style.width = this.width;
  }

}
