import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddmanualactivityComponent } from './addmanualactivity/addmanualactivity.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [
    AddmanualactivityComponent
  ],
})
export class ClientAddmanualactivityFeatureModule {}
