import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewprofilepageComponent } from './viewprofilepage/viewprofilepage.component';

const routes: Routes = [

  {
    path: '',
    component: ViewprofilepageComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
