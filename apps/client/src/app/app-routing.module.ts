import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
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

  {
    path: 'dashboard',
    loadChildren: () =>
      import('@training-buddy/client/dashboard/feature').then(
        m => m.ClientDashboardFeatureModule
      ),
  },

  {
    path: 'settings',
    loadChildren: () =>
      import('@training-buddy/client/settings/feature').then(
        m => m.ClientSettingsFeatureModule
      ),
  },

  {
    path: 'profile',
    loadChildren: () =>
      import('@training-buddy/client/profile/feature').then(
        m => m.ClientProfileFeatureModule
      ),
  },

  {
    path: 'configureprofile',
    loadChildren: () =>
      import('@training-buddy/client/athlete-profile/feature').then(
        m => m.ClientAthleteProfileFeatureModule
      ),
  },

  {
    path: 'strava',
    loadChildren: () =>
      import('@training-buddy/client/strava/feature').then(
        m => m.ClientStravaFeatureModule
      ),
  },

  {
    path: 'exchange_token',
    loadChildren: () =>
      import('@training-buddy/client/strava/feature').then(
        m => m.ClientStravaFeatureModule
      ),
  },

  {
    path: 'scheduleworkout',
    loadChildren: () =>
      import ('@training-buddy/client/scheduleworkout/feature').then(
        m => m.ClientScheduleworkoutFeatureModule
      ),
  },

  {
    path: 'addactivity',
    loadChildren: () =>
      import ('@training-buddy/client/addmanualactivity/feature').then(
        m => m.ClientAddmanualactivityFeatureModule
      )
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}