import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleworkoutComponent } from './scheduleworkout/scheduleworkout.component';
import { ScheduleWorkoutRoutingModule } from './scheduleworkout-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';

@NgModule({
  imports: [
    CommonModule,
    ScheduleWorkoutRoutingModule,
    UiModule
  ],
  declarations: [
    ScheduleworkoutComponent
  ],
})
export class ClientScheduleworkoutFeatureModule {}
