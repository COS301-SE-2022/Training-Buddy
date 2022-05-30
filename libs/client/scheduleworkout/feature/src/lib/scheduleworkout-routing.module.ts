import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleworkoutComponent } from './scheduleworkout/scheduleworkout.component';

const routes: Routes = [

  {
    path: '',
    component: ScheduleworkoutComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleWorkoutRoutingModule { }
