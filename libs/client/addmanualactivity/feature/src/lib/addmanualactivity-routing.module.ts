import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddmanualactivityComponent } from './addmanualactivity/addmanualactivity.component';

const routes: Routes = [

  {
    path: '',
    component: AddmanualactivityComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddManualActivityRoutingModule { }
