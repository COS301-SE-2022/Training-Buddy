import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'training-buddy-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() { console.log('') }

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
