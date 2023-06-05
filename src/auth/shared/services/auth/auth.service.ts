import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class AuthService {
  constructor(
    private angularFire: AngularFireAuth
  ) {}

  createUser(email: string, password: string) {
    return this.angularFire.auth
      .createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.angularFire.auth
      .signInWithEmailAndPassword(email, password);
  }
}
