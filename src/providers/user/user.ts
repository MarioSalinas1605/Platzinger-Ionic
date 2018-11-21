import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { User } from '../interfaces/user';
// import { AngularFireDatabase } from '@angular/fire/database';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

}


// constructor(private angularFireDatabase: AngularFireDatabase) {
//
// }
//
// getUsers(){
//   return this.angularFireDatabase.list('/users')
// }
//
// getUserById(uid){
//   return this.angularFireDatabase.object('/users/'+uid)
// }
// createUser(user){
//   return this.angularFireDatabase.object('/users/'+user.uid).set(user)
// }
// editUser(user){
//   return this.angularFireDatabase.object('/users/'+user.uid).set(user)
// }
// setAvatar(avatar, uid){
//   return this.angularFireDatabase.object('/users/'+uid+'/avatar').set(avatar)
// }
