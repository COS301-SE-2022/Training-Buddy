import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { SignupRoutingModule } from './signup-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule
  ],
  declarations: [
    SignupComponent
  ],
})
export class ClientSignupFeatureModule {}
