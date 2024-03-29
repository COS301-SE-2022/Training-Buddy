import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnsignednavbarComponent } from './unsignednavbar/unsignednavbar.component';
import { SignedComponent } from './signed/signed.component';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsnavbarComponent } from './settingsnavbar/settingsnavbar.component';
import { RouterModule } from '@angular/router';
import { BacknavbarComponent } from './backnavbar/backnavbar.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    UnsignednavbarComponent,
    SignedComponent,
    NavbarComponent,
    SettingsnavbarComponent,
    BacknavbarComponent,
    LogoComponent
  ],
  exports: [
    UnsignednavbarComponent,
    SignedComponent,
    MaterialModule,
    NavbarComponent,
    SettingsnavbarComponent,
    BacknavbarComponent,
    LogoComponent
  ]
})
export class UiModule {}
