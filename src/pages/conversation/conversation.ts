import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user';
import { HomePage } from '../home/home';

/**
 * Generated class for the ConversationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {
  user: User;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('data');
    console.log(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }
  goToHome() {
    this.navCtrl.push(HomePage);
  }
  backToHome() {
    this.navCtrl.pop();
  }

}
