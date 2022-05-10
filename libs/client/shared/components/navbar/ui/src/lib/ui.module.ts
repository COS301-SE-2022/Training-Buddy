import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnsignednavbarComponent } from './unsignednavbar/unsignednavbar.component';
import { SignedComponent } from './signed/signed.component';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    UnsignednavbarComponent,
    SignedComponent,
  ],
  exports: [
    UnsignednavbarComponent,
    SignedComponent,
    MaterialModule
  ]
})
export class UiModule {}
