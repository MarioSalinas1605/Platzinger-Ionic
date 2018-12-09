import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";

/*
  Generated class for the RequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestProvider {
  constructor(private angularFireDatabase: AngularFireDatabase){}
  createRequest(request) {
    const cleanEmail = request.receiver_email.replace('.',',')
    return this.angularFireDatabase.object('requests/'+cleanEmail+'/'+request.sender).set(request);
  }
}
