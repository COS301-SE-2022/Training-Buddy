import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewscheduleComponent } from './viewschedule/viewschedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { CookieService } from 'ngx-cookie-service';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutInviteComponent } from './workout-invite/workout-invite.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    UiModule,
    MatDialogModule
  ],
  declarations: [
    ViewscheduleComponent,
    WorkoutComponent,
    WorkoutInviteComponent,
    RatingComponent
  ],
  providers: [
    CookieService,
    { 
      provide: MatDialogRef,
      useValue: []
    }, 
    { 
      provide: MAT_DIALOG_DATA, 
      useValue: [], 
    }

  ],
  entryComponents: [
    WorkoutInviteComponent 
],
})
export class ClientScheduleFeatureModule {}
