import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClientJsonpModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UiModule,
    HttpClientJsonpModule,
  ],
  declarations: [
    DashboardComponent
  ],
})
export class ClientDashboardFeatureModule {}
