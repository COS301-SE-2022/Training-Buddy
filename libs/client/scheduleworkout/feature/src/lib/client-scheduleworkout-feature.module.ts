import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleworkoutComponent } from './scheduleworkout/scheduleworkout.component';
import { ScheduleWorkoutRoutingModule } from './scheduleworkout-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ScheduleWorkoutRoutingModule,
  ],
  declarations: [
    ScheduleworkoutComponent
  ],
})
export class ClientScheduleworkoutFeatureModule {}
