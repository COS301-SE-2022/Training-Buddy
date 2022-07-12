import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewscheduleComponent } from './viewschedule/viewschedule.component';

const routes: Routes = [

  {
    path: '',
    component: ViewscheduleComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
