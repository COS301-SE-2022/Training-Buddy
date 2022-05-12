import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthleteprofileComponent } from './athleteprofile/athleteprofile.component';
import { athleteProfileRoutingModule } from './dashboard-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    athleteProfileRoutingModule,
    UiModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AthleteprofileComponent
  ],
})
export class ClientAthleteProfileFeatureModule {}
