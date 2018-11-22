import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(private firebaseAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }
  registerWithEmail(email, password) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  loginWithEmail(email, password) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }
}
