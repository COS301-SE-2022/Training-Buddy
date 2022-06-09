import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ViewprofilepageComponent } from './viewprofilepage/viewprofilepage.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [
    ViewprofilepageComponent
  ],
})
export class ClientViewprofileFeatureModule {}
