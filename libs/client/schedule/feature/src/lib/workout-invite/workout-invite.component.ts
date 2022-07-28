import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Apollo, gql } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'training-buddy-workout-invite',
  templateUrl: './workout-invite.component.html',
  styleUrls: ['./workout-invite.component.scss']
})
export class WorkoutInviteComponent implements OnInit {
  loading = true;
  buddies: any;
  buddiesOriginal: any;
  buddyCount: any;
  noBuddies = false;
  email: string;

  constructor(public dialogRef: MatDialogRef<WorkoutInviteComponent>, private apollo: Apollo, private cookieService: CookieService,
    @Inject(MAT_DIALOG_DATA) public workoutID: string){
    this.email = this.cookieService.get('email');
  }

  ngOnInit(): void {
    console.log("sheeesh");
    console.log(this.workoutID);
    this.getData(this.email);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getData(email : string) { //this is the email of the user to fetch the data for

    this.getBuddies(email).subscribe({
      next: (data : any) => {
        this.buddies = data.data.getConnections;
        this.buddiesOriginal = this.buddies;
        this.loading = false;
        this.buddyCount = this.buddies.length;
        if (this.buddyCount == 0) {
          this.noBuddies = true;
        }
      }
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
        id,
        email
      }
      }
      `,
    });
  }
  sendRequest(email: string){
    this.apollo
    .mutate({
      mutation: gql`
        mutation{
        sendInvite(
          email: "${ this.email }",
          receiver:"${ email }",
          workoutID: "${ this.workoutID }"
        ){
          message
        }
      }
    `,
    }).subscribe({
      next: (data: any) => {
        console.log(data.data.sendInvite.message);
      
        this.buddiesOriginal.map((el : any, i : number) => {
          if (el.email == email) {
            if(this.buddyCount == 1){
              this.buddiesOriginal = null;
              this.buddies = null;
              this.buddyCount = 0;
              this.noBuddies = true;
            }
            else{
              this.buddiesOriginal.splice(i, 1);
              this.buddies = this.buddiesOriginal;
              console.log('here');
            }
          }
        });
        if(data.data.sendInvite.message == "Failure"){
          //create invite 
          this.createInvite(email);
          //sendRequest
        
        }
      }
    });
  }
  createInvite(email: string){
    this.apollo
    .mutate({
      mutation: gql`
        mutation{
          createInvite(
            email: "${this.email}",
            workoutID: "${this.workoutID}"
          ){
            message
          }
      }
      `
    }).subscribe({
      next: (data: any) =>{
        console.log(data.data.createInvite.message);
        this.sendRequest(email);
      }
    })
  }
}
