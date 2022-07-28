import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewscheduleComponent } from './viewschedule/viewschedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { CookieService } from 'ngx-cookie-service';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutInviteComponent } from './workout-invite/workout-invite.component';

@NgModule({
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    UiModule
  ],
  declarations: [
    ViewscheduleComponent,
    WorkoutComponent,
    WorkoutInviteComponent
  ],
  providers: [
    CookieService
  ]
})
export class ClientScheduleFeatureModule {}
