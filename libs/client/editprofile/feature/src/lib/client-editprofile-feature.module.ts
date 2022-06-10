import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditprofilepageComponent } from './editprofilepage/editprofilepage.component';
import { EditProfileRoutingModule } from './editprofile-routing.module';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    EditProfileRoutingModule,
    UiModule,
    ReactiveFormsModule
  ],
  declarations: [
    EditprofilepageComponent
  ],
})
export class ClientEditprofileFeatureModule {}
