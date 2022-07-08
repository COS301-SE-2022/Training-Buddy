import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ChangePasswordRoutingModule } from './changepassword-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ChangePasswordRoutingModule
  ],
  declarations: [
    ChangepasswordComponent
  ],
})
export class ClientChangepasswordFeatureModule {}
