import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginModule } from "./login/login.module";
import { RegisterModule } from "./register/register.module";

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SharedModule } from "./shared/shared.module";

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: 'register', loadChildren: './register/register.module#RegisterModule' },
    ],
  },
];

const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyCa-uB3AT92brcXkQMfZpsHzXDLBs-eAVE",
  authDomain: "fitness-app-a50f2.firebaseapp.com",
  databaseURL: "https://fitness-app-a50f2-default-rtdb.firebaseio.com",
  projectId: "fitness-app-a50f2",
  storageBucket: "fitness-app-a50f2.appspot.com",
  messagingSenderId: "813319582984",
  // appId: "1:813319582984:web:e830bd9e4a17bde9ba68bd",
  // measurementId: "G-QXGYXFP2GZ"
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    LoginModule,
    RegisterModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot(),
  ],
  providers: []
})
export class AuthModule {}
