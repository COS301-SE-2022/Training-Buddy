import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditprofilepageComponent } from './editprofilepage/editprofilepage.component';

const routes: Routes = [

  {
    path: '',
    component: EditprofilepageComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProfileRoutingModule { }
