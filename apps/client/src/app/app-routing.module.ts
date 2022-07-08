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
    path: 'editprofile',
    loadChildren: () =>
      import('@training-buddy/client/editprofile/feature').then(
        m => m.ClientEditprofileFeatureModule
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
  },

  {
    path: 'profile',
    loadChildren: () =>
      import('@training-buddy/client/viewprofile/feature').then(
        m => m.ClientViewprofileFeatureModule
      )
  },

  {
    path: 'uploadimage',
    loadChildren: () =>
      import('@training-buddy/client/uploadprofileimage/feature').then(
        m => m.ClientUploadprofileimageFeatureModule
      )
  },

  {
    path: 'changepassword',
    loadChildren: () =>
      import('@training-buddy/client/changepassword/feature').then(
        m => m.ClientChangepasswordFeatureModule
      )
  },

  {
    path: '**',
    loadChildren: () =>
      import('@training-buddy/client/pagenotfound').then(
        m => m.ClientPagenotfoundModule
      )
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}