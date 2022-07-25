import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClientJsonpModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

const firebase = {
  apiKey: 'AIzaSyD_61N0OLPsfAKHoawzDtIExK_BU3GR6hM',
  authDomain: 'training-buddy-2022.firebaseapp.com',
  databaseURL: 'https://training-buddy-2022-default-rtdb.firebaseio.com',
  projectId: 'training-buddy-2022',
  storageBucket: 'training-buddy-2022.appspot.com',
  messagingSenderId: '<your-messaging-sender-id>',
  appId: '445917436',
  measurementId: 'G-K7WPZTL3FJ'
}

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
  providers: [
    CookieService
  ]
})
export class ClientDashboardFeatureModule {}
