import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    UiModule    
  ],
  declarations: [
    SignupComponent,
  ],
})
export class ClientSignupFeatureModule {}
