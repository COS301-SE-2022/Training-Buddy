import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditprofilepageComponent } from './editprofilepage/editprofilepage.component';
import { EditProfileRoutingModule } from './editprofile-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { CookieService } from 'ngx-cookie-service';
@NgModule({
  imports: [
    CommonModule,
    EditProfileRoutingModule,
    UiModule,
    MatGoogleMapsAutocompleteModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    EditprofilepageComponent,
  ],
  providers: [
    CookieService
  ]
})
export class ClientEditprofileFeatureModule {}
