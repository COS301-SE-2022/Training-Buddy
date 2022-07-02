import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PageNotFoundRoutingModule } from './strava-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PageNotFoundRoutingModule
  ],
  declarations: [
    PagenotfoundComponent
  ],
})
export class ClientPagenotfoundModule {}
