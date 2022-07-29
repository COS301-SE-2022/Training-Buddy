import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewprofilepageComponent } from './viewprofilepage/viewprofilepage.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import {CookieService} from 'ngx-cookie-service';
@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    UiModule
  ],
  declarations: [
    ViewprofilepageComponent,
  ],
  providers: [
    CookieService
  ]
})
export class ClientViewprofileFeatureModule {}
