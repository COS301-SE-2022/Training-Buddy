import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UploadProfileImageRoutingModule } from './strava-routing.module';
import { UploadprofileimageComponent } from './uploadprofileimage/uploadprofileimage.component';

@NgModule({
  imports: [
    CommonModule,
    UploadProfileImageRoutingModule
  ],
  declarations: [
    UploadprofileimageComponent
  ],
})
export class ClientUploadprofileimageFeatureModule {}
