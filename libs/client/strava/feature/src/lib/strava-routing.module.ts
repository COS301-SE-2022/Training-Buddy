import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StravaexchangetokenComponent } from './stravaexchangetoken/stravaexchangetoken.component';
import { StravalinkComponent } from './stravalink/stravalink.component';

const routes: Routes = [

  {
    path: '',
    component: StravaexchangetokenComponent
  },

  {
    path: 'link',
    component: StravalinkComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StravaRoutingModule { }
