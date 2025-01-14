import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { Store } from "store";

import "rxjs/add/operator/do";

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {
  auth$ = this.angularFire.authState
    .do((next) => {
      if (!next) {
        this.store.set('user', null);
        return;
      }

      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      }
      this.store.set('user', user);
    })


  constructor(
    private store: Store,
    private angularFire: AngularFireAuth
  ) {}

  get user() {
    return this.angularFire.auth.currentUser;
  }

  get authState() {
    return this.angularFire.authState;
  }

  createUser(email: string, password: string) {
    return this.angularFire.auth
      .createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.angularFire.auth
      .signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.angularFire.auth.signOut();
  }
}
