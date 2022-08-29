import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'training-buddy-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any) { }

  ngOnInit(): void {
    console.log("Rating this user "+ this.user.email)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
