import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileuploadComponent } from './profileupload/profileupload.component';

const routes: Routes = [

  {
    path: '',
    component: ProfileuploadComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileImageUploadRoutingModule { }
