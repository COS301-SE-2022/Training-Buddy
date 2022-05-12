import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnsignednavbarComponent } from './unsignednavbar/unsignednavbar.component';
import { SignedComponent } from './signed/signed.component';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    UnsignednavbarComponent,
    SignedComponent,
    NavbarComponent
  ],
  exports: [
    UnsignednavbarComponent,
    SignedComponent,
    MaterialModule,
    NavbarComponent
  ]
})
export class UiModule {}
