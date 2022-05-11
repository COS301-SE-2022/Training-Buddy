import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    UiModule
  ],
  declarations: [
    ProfileComponent
  ],
})
export class ClientProfileFeatureModule {}
