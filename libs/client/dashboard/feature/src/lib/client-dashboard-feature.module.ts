import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClientJsonpModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from "@training-buddy/environment";

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UiModule,
    HttpClientJsonpModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    CookieService
  ]
})
export class ClientDashboardFeatureModule {}
