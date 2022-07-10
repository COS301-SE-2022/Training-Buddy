import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewprofilepageComponent } from './viewprofilepage/viewprofilepage.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import {CookieService} from 'ngx-cookie-service';
import { BuddylistComponent } from './buddylist/buddylist.component';
import { LoglistComponent } from './loglist/loglist.component';
@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    UiModule
  ],
  declarations: [
    ViewprofilepageComponent,
    BuddylistComponent,
    LoglistComponent
  ],
  providers: [
    CookieService
  ]
})
export class ClientViewprofileFeatureModule {}
