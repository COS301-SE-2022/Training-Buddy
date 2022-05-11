import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { DataAccessModule } from '@training-buddy/client/shared/interfaces/user/data-access';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    UiModule,
    MatGoogleMapsAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    SignupComponent,
  ],
  providers: [
    FormBuilder, Apollo
  ]
})
export class ClientSignupFeatureModule {}
