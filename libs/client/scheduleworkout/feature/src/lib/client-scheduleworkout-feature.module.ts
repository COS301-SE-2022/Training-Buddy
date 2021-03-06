import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleworkoutComponent } from './scheduleworkout/scheduleworkout.component';
import { ScheduleWorkoutRoutingModule } from './scheduleworkout-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { ReactiveFormsModule } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  imports: [
    CommonModule,
    ScheduleWorkoutRoutingModule,
    UiModule,
    MatGoogleMapsAutocompleteModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  declarations: [
    ScheduleworkoutComponent
  ],
  providers:[
    CookieService
  ]
})
export class ClientScheduleworkoutFeatureModule {}
