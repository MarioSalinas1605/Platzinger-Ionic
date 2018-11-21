import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../interfaces/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  query: string = ''
  users: User[]
  constructor(public navCtrl: NavController) {

  }

}
