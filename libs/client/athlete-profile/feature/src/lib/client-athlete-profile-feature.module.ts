import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthleteprofileComponent } from './athleteprofile/athleteprofile.component';
import { athleteProfileRoutingModule } from './dashboard-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  imports: [
    CommonModule,
    athleteProfileRoutingModule,
    UiModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    AthleteprofileComponent
  ],
  providers: [
    FormBuilder, 
    Apollo,
    CookieService
  ]
})
export class ClientAthleteProfileFeatureModule {}
