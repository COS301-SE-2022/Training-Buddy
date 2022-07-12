import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ChangePasswordRoutingModule } from './changepassword-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    UiModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ChangepasswordComponent
  ],
})
export class ClientChangepasswordFeatureModule {}
