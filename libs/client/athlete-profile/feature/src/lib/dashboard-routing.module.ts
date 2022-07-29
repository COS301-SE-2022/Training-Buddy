import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthleteprofileComponent } from './athleteprofile/athleteprofile.component';

const routes: Routes = [

  {
    path: '',
    component: AthleteprofileComponent
  },

  {
    path: ':flag',
    component: AthleteprofileComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class athleteProfileRoutingModule { }
