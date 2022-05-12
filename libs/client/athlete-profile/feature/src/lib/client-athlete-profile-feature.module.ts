import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthleteprofileComponent } from './athleteprofile/athleteprofile.component';
import { athleteProfileRoutingModule } from './dashboard-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    athleteProfileRoutingModule,
    UiModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AthleteprofileComponent
  ],
  providers: [
    FormBuilder, Apollo
  ]
})
export class ClientAthleteProfileFeatureModule {}
