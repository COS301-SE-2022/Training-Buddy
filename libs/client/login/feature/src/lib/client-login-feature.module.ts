import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { LoginRoutingModule } from './login-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {CookieService} from 'ngx-cookie-service';
@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    UiModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    LoginpageComponent,
  ],
  providers: [
    FormBuilder, 
    Apollo,
    CookieService
  ]
})
export class ClientLoginFeatureModule {}
