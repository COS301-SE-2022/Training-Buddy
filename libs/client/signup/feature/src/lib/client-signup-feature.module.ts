import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    MaterialModule
  ],
  declarations: [
    SignupComponent
  ],
})
export class ClientSignupFeatureModule {}
