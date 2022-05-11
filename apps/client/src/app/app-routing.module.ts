import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: 'login',
    loadChildren: () =>
      import('@training-buddy/client/login/feature').then(
        m => m.ClientLoginFeatureModule
      ),
  },

  {
    path: 'signup',
    loadChildren: () =>
      import('@training-buddy/client/signup/feature').then(
        m => m.ClientSignupFeatureModule
      ),
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('@training-buddy/client/dashboard/feature').then(
        m => m.ClientDashboardFeatureModule
      ),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}