import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StravaexchangetokenComponent } from './stravaexchangetoken/stravaexchangetoken.component';
import { StravalinkComponent } from './stravalink/stravalink.component';
import { StravaRoutingModule } from './strava-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    StravaRoutingModule
  ],
  declarations: [
    StravaexchangetokenComponent,
    StravalinkComponent
  ],
})
export class ClientStravaFeatureModule {}
