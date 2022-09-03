import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import {CookieService} from 'ngx-cookie-service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
@Component({
  selector: 'training-buddy-edit-profile',
  templateUrl: './editprofilepage.component.html',
  styleUrls: ['./editprofilepage.component.scss'],
  animations: [

    trigger(
      'fadeIn', [
        transition(':enter', [
          animate(100, keyframes([
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
export class EditprofilepageComponent implements OnInit {

  user!: any;
  task!: AngularFireUploadTask;
  updateForm!: FormGroup;
  frmBuilder! : FormBuilder;
  vicinity = '';
  longitude = 0;
  latitude = 0;
  originalEmail = '';
  oldLocation = '';
  base64File! : any;
  currentImage! : string;
  newImage! : File;
  fileuploadflag = false; //assume the user won't upload a new image
  fileuploaderror = '';
  ref!: AngularFireStorageReference;
  constructor(private frm : FormBuilder, private apollo: Apollo, private cookie: CookieService, private router : Router,private afStorage: AngularFireStorage) {
    this.frmBuilder = frm;
    const id = this.cookie.get('id');
    this.ref = this.afStorage.ref("UserProfileImage/"+id);
    this.ref.getDownloadURL().subscribe((downloadURL) => {
    this.currentImage=downloadURL;
    });
    
  }

  ngOnInit(): void {

    this.updateForm= this.frmBuilder.group({
      userNameSurname: ['', this.validateNameSurname],
      userEmail: ['', this.validateEmail],
      userCellNumber: ['', this.validateCellNumber],
      userGender: ['', this.validateGender],
      userLocation: ['', this.validateLocation]
    });

    this.getCurrentUser().subscribe({
      next: (data: any) => {
        this.user = data.data.getOne;
        this.originalEmail = this.cookie.get('email');
        this.longitude = this.user.longitude;
        this.latitude = this.user.latitude;
        this.oldLocation = this.user.location;
        this.updateForm.setValue({
          userNameSurname: `${this.user.userName} ${this.user.userSurname}`,
          userEmail: this.user.email,
          userCellNumber: this.user.cellNumber,
          userGender: this.user.gender,
          userLocation: this.user.location
        })
      }
    })

  }

  getCurrentUser() {
    return this.apollo
    .query({
      query: gql`query{
        getOne(
          email: "${this.cookie.get('email')}",
      ){
        userName,
        userSurname,
        location,
        longitude,
        latitude,
        dob,
        gender,
        email,
        cellNumber,
        bio,
        metrics{lift , ride , run , swim},
        buddies
      }
      }`
    })
  }
  
  //Google geocoding functions
  onAutocompleteSelected(event : any) {
    this.vicinity = event.vicinity;
  }

  onLocationSelected(event: any) {
    if (event != null) {
      this.latitude = event.latitude;
      this.longitude = event.longitude;
    }
  }

  //userNameSurname
  validateNameSurname(input : FormControl) : {[valtype : string] : string} | null {
    const userNameSurname = input.value;
    //regex for a length of 3 and a space
    const re = /(([A-Z]|[a-z]))+ ([A-Z]|([a-z]))+/;
    if (!re.test(userNameSurname)) {
      //return error
      return {'error_msg' : 'Name and surname is required'}
    }
    //no error
    return null;
  }

  validateSurname(input : FormControl) : {[valtype : string] : string} | null {
    const userSurname = input.value;
    //regex for a length of 3 and a space
    const re = /(([A-Z]|[a-z]))/;
    if (!re.test(userSurname)) {
      //return error
      return {'error_msg' : 'Surname is required'}
    }
    //no error
    return null;
  }

  //userEmail
  validateEmail(input : FormControl) : {[valtype : string] : string} | null {
    const userEmail = input.value;
    //regex for email from RFC 5322 standards
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(userEmail)) {
      //return error
      return {'error_msg' : 'Valid email is required'}
    }
    //no error
    return null;
  }

  //userCellNumber
  validateCellNumber(input : FormControl) : {[valtype : string] : string} | null {
    const val = input.value;
    //remove spaces:
    const userCellNumber = val.replace(/ /g, '');
    //regex for a phone number (length of 10, )
    const re = /^[0-9]{10,10}$/;
    if (!re.test(userCellNumber)) {
      //return error
      return {'error_msg' : 'Valid phone number is required'}
    }
    //no error
    return null;
  }

  validateGender(input : FormControl) : {[valtype : string] : string} | null {
    const userGender = input.value;
    //regex for M or F
    const re = /[M]|[F]/;
    if (!re.test(userGender)) {
      return {'error_msg' : 'Valid choice required'}
    }
    //no error
    return null;
  }

  validateLocation(input : FormControl) : {[valtype : string] : string} | null {
    const userLocation = input.value;
    //check for not null
    if (userLocation.length == 0) {
      return {'error_msg' : 'Location is required'}
    }
    //no error
    return null;
  }

  fileattatched(event : any) {

    if (event.target.files.length == 0 && this.newImage != null)
      return;

    const file = event.target.files[0];
    // this.submit = true;
    this.fileuploadflag = false;
    const re = /^image*/;
    if (!file.type.match(re)) {
      //image is not valid here due to mime:
      //check if a previous image was uploaded:
      if (this.newImage != null) {
        this.fileuploaderror = 'Only images are supported.';
        this.newImage = file;
        this.fileuploadflag = true;
        return; //this will ignore files that are not images
      }
      //no previous image was uploaded:
      this.fileuploaderror = 'Only images are supported.';
      this.fileuploadflag = true;
      return;
    }

    this.newImage = event.target.files[0];
    
    const reader = new FileReader();
    reader.onload = (event:any) => {
        this.currentImage = event.target.result;
    }
    reader.readAsDataURL(this.newImage);

  }

  save(){

    const NameSurname = this.updateForm.controls['userNameSurname'].value;
    const Name = NameSurname.split(' ')[0];
    const Surname = NameSurname.split(' ')[1];
    const Email = this.updateForm.controls['userEmail'].value;
    const CellNumber = this.updateForm.controls['userCellNumber'].value;
    const Gender = this.updateForm.controls['userGender'].value;
    const Location = this.updateForm.controls['userLocation'].value;

    if (this.newImage != null) {
      //update to the photo
    const id = this.cookie.get('id');
    this.ref = this.afStorage.ref("UserProfileImage/"+id);// can set this ref in to a cookie to get download url 
    this.task = this.ref.put(this.newImage); 

      this.Base64encode(this.newImage).then(encode => {
        this.updateUser(Name, Surname, Email, CellNumber, Gender, Location, encode).subscribe({
          next: () => {
            this.router.navigate(['settings']);
          }
        });
      });

    } else {

      //no update to the photo
      this.updateUser(Name, Surname, Email, CellNumber, Gender, Location, null).subscribe({
        next: () => {
          this.router.navigate(['settings']);
        }
      });

    }

  }

  updateUser(Name : string, Surname : string, Email : string, CellNumber : string, Gender : string, Location : string, newImage : any) {

    //THIS QUERY MUST BE UPDATED TO WORK WITH UPDATING THE PROFILE IMAGE and LONG AND LAT
    //use this.longitude and this.latitude for the new gps-cords

    return this.apollo
        .mutate({
          mutation: gql`
              mutation{
              updateProfile(updates: {
                oldemail: "${this.originalEmail}",
                userName: "${Name}",
                userSurname: "${Surname}",
                location: "${Location}",
                gender: "${Gender}",
                email: "${Email}",
                cellNumber: "${CellNumber}",
            }){
              message
            }
          }
        `,
      })
  }

  Base64encode(file : File) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    })
  }

}