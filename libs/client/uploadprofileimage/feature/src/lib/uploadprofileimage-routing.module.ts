import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadprofileimageComponent } from './uploadprofileimage/uploadprofileimage.component';

const routes: Routes = [

  {
    path: '',
    component: UploadprofileimageComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadProfileImageRoutingModule { }
