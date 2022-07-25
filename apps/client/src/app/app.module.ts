import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';

//firestore
import { AngularFireModule } from '@angular/fire/compat';

const firebase = {
  apiKey: 'AIzaSyD_61N0OLPsfAKHoawzDtIExK_BU3GR6hM',
  authDomain: 'training-buddy-2022.firebaseapp.com',
  databaseURL: 'https://training-buddy-2022-default-rtdb.firebaseio.com',
  projectId: 'training-buddy-2022',
  storageBucket: 'training-buddy-2022.appspot.com',
  messagingSenderId: '<your-messaging-sender-id>',
  appId: '445917436',
  measurementId: 'G-K7WPZTL3FJ'
}
@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpClientModule,
    ServiceWorkerModule.register('custom-service-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBxYaJFWxO0y8YjqvG8OOGuwqvDPwDaSMY',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(firebase),
    
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3333/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
    HttpClient
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}