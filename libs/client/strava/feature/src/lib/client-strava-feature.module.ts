import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StravaexchangetokenComponent } from './stravaexchangetoken/stravaexchangetoken.component';
import { StravalinkComponent } from './stravalink/stravalink.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [
    StravaexchangetokenComponent,
    StravalinkComponent
  ],
})
export class ClientStravaFeatureModule {}
