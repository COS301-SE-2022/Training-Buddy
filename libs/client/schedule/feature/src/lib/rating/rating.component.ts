import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'training-buddy-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  numberofStars = 0;
  constructor(public dialogRef: MatDialogRef<RatingComponent>,private apollo : Apollo,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public user: any) { }

  ngOnInit(): void {
    console.log("Rating this user "+ this.user.email)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setStars(rating: number) {
    this.numberofStars = rating;
    console.log("setting stars to "+ rating);
  }

  getFill(rating: number) {
    if(rating < this.numberofStars){
      //empty star
      return "259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z";
    }
    //full star
    return "M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z";
  }
  greater(x: number): boolean{
    if(this.numberofStars >= x){
      return true;
    }
    return false;
  }


  add():void{
    this.apollo
    .mutate({
      mutation: gql`
      mutation{
        addRating(
          email:"${ this.user.email }",
          rating: ${ this.numberofStars },
        ){
          message
        }
      }
      `
    }).subscribe({
      next: (data: any) =>{
        console.log(data.data.addRating.message);
        this.snackBar.open("Success!","", {duration: 2000});
        this.dialogRef.close();
      }
    })
  }

}
