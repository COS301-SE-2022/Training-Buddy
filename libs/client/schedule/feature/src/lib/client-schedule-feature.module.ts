import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewscheduleComponent } from './viewschedule/viewschedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';

@NgModule({
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    UiModule
  ],
  declarations: [
    ViewscheduleComponent
  ],
})
export class ClientScheduleFeatureModule {}
