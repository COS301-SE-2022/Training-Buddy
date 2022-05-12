import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'training-buddy-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  img : string;
  constructor() { 
    this.img = 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80';
    
  }

  ngOnInit(): void {
    console.log('')
  }
  editProfile(){
    console.log('take the user to the edit profile page')
  }
  nextPage(page:string){
    console.log('take the user to',page)
    
  }
}
