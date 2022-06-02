import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleworkoutComponent } from './scheduleworkout/scheduleworkout.component';
import { ScheduleWorkoutRoutingModule } from './scheduleworkout-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ScheduleWorkoutRoutingModule,
    UiModule,
    ReactiveFormsModule
  ],
  declarations: [
    ScheduleworkoutComponent
  ],
})
export class ClientScheduleworkoutFeatureModule {}
