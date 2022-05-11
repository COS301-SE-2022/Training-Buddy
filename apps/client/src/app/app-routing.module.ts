import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: () =>
      import('@training-buddy/client/login/feature').then(
        m => m.ClientLoginFeatureModule
      ),
  },

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}