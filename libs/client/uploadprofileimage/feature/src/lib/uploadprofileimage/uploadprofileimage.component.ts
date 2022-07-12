import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'training-buddy-upload-profile-image',
  templateUrl: './uploadprofileimage.component.html',
  styleUrls: ['./uploadprofileimage.component.scss']
})
export class UploadprofileimageComponent implements OnInit {

  img : string;
  profileimage! : File;
  uploadfrm! : FormGroup;
  submit : boolean;
  fileuploadflag : boolean;
  fileuploaderror = '';
  showfilename = false;
  url = '';
  showuploaded = false;
  filename = '';

  constructor(private builder : FormBuilder, private cookie : CookieService, private apollo : Apollo, private router : Router) { 
    this.img = 'https://images.unsplash.com/photo-1512941675424-1c17dabfdddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';
    this.submit = false;
    this.fileuploadflag = false;
  }

  ngOnInit(): void {
    this.uploadfrm = this.builder.group({
      image : ['', Validators.required]
    })
  }

  fileattatched(event : any) {
    
    if (event.target.files.length == 0 && this.profileimage != null)
      return;

    const file = event.target.files[0];
    this.submit = true;
    this.fileuploadflag = false;
    const re = /^image*/;
    if (!file.type.match(re)) {
      //image is not valid here due to mime:
      //check if a previous image was uploaded:
      if (this.profileimage != null) {
        this.fileuploaderror = 'Only images are supported.';
        this.profileimage = file;
        this.fileuploadflag = true;
        return; //this will ignore files that are not images
      }
      //no previous image was uploaded:
      this.fileuploaderror = 'Only images are supported.';
      this.fileuploadflag = true;
      this.uploadfrm.setErrors({
        image: false
      });
      return;
    }

    this.profileimage = event.target.files[0];
    
    this.showfilename = true;
    this.filename = this.profileimage.name;

    const reader = new FileReader();
    reader.onload = (event:any) => {
        this.url = event.target.result;
        this.showuploaded = true;
    }
    reader.readAsDataURL(this.profileimage);

  }

  upload() {

    this.submit = true;
    
    if (this.uploadfrm.invalid) {
      //make the box outline red
      this.fileuploadflag = true;
      this.fileuploaderror = 'Image is Requied.';
      return;
    }

    const email = this.cookie.get('email');
    const image = this.profileimage;

    this.Base64encode(image).then(encode => {
      //encode is the base64 representation of the image.
      this.apollo
        .mutate ({
          mutation: gql`
          
          `
        }).subscribe({
          next: () => {
            //route to next page:
            this.router.navigate(['strava/link']);
          },
        });
    });

  }

  Base64encode(file : File) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    })
  }

}
