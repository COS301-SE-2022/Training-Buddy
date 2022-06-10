import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddmanualactivityComponent } from './addmanualactivity/addmanualactivity.component';
import {CookieService} from 'ngx-cookie-service';

const routes: Routes = [

  {
    path: '',
    component: AddmanualactivityComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CookieSerivce]
})
export class AddManualActivityRoutingModule { }
