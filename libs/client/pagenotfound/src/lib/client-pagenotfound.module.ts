import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundRoutingModule } from './pagenotfound-routing.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';

@NgModule({
  imports: [
    CommonModule,
    PageNotFoundRoutingModule,
    UiModule
  ],
  declarations: [
    PagenotfoundComponent
  ],
})
export class ClientPagenotfoundModule {}
