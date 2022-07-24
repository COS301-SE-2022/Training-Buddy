import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewscheduleComponent } from './viewschedule/viewschedule.component';
import { WorkoutComponent } from './workout/workout.component';

const routes: Routes = [

  {
    path: '',
    component: ViewscheduleComponent
  },
  {
    path: 'workout',
    component: WorkoutComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
