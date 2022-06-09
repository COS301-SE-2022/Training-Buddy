import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewprofilepageComponent } from './viewprofilepage/viewprofilepage.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    UiModule
  ],
  declarations: [
    ViewprofilepageComponent
  ],
})
export class ClientViewprofileFeatureModule {}
