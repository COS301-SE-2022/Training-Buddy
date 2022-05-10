import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { LoginRoutingModule } from './login-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    UiModule
  ],
  declarations: [
    LoginpageComponent
  ],
})
export class ClientLoginFeatureModule {}
