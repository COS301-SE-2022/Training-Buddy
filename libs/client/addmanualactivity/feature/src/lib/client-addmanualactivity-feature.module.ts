import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddmanualactivityComponent } from './addmanualactivity/addmanualactivity.component';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { AddManualActivityRoutingModule } from './addmanualactivity-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    AddManualActivityRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AddmanualactivityComponent
  ],
  providers: [
    CookieService
  ]
})
export class ClientAddmanualactivityFeatureModule {}
