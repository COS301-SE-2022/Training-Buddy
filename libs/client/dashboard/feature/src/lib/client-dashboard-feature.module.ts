import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UiModule
  ],
  declarations: [
    DashboardComponent
  ],
})
export class ClientDashboardFeatureModule {}
