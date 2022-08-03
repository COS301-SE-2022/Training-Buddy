import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { UploadProfileImageRoutingModule } from './uploadprofileimage-routing.module';
import { UploadprofileimageComponent } from './uploadprofileimage/uploadprofileimage.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Apollo } from 'apollo-angular';


@NgModule({
  imports: [
    CommonModule,
    UploadProfileImageRoutingModule,
    UiModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    UploadprofileimageComponent
  ],
  providers: [
    FormBuilder,
    Apollo,
    CookieService
  ]
})
export class ClientUploadprofileimageFeatureModule {}
