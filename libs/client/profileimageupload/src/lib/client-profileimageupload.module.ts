import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileuploadComponent } from './profileupload/profileupload.component';
import { ProfileImageUploadRoutingModule } from './profileimageupload-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileImageUploadRoutingModule
  ],
  declarations: [
    ProfileuploadComponent
  ],
})
export class ClientProfileimageuploadModule {}
