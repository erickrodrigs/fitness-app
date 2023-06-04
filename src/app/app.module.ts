import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules
import { AuthModule } from '../auth/auth.module';

// containers
import { AppComponent } from './containers/app/app.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}

/*
const firebaseConfig = {
  apiKey: "AIzaSyCa-uB3AT92brcXkQMfZpsHzXDLBs-eAVE",
  authDomain: "fitness-app-a50f2.firebaseapp.com",
  databaseURL: "https://fitness-app-a50f2-default-rtdb.firebaseio.com",
  projectId: "fitness-app-a50f2",
  storageBucket: "fitness-app-a50f2.appspot.com",
  messagingSenderId: "813319582984",
  appId: "1:813319582984:web:e830bd9e4a17bde9ba68bd",
  measurementId: "G-QXGYXFP2GZ"
};
*/
