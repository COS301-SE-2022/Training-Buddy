import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { LandingComponent }  from './landing/landing.component'
@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    UiModule,
  ],
  declarations: [
    LandingComponent
  ]
})
export class ClientLandingpageFeatureModule {}
