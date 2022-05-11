import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { SettingsRoutingModule } from './profile-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    UiModule
  ],
  declarations: [
    SettingsComponent
  ],
})
export class ClientSettingsFeatureModule {}
