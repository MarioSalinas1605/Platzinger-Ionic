import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User, Status } from '../../interfaces/user';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';
import { ConversationPage } from '../conversation/conversation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: User[];
  query: string;
  yuliana: User = {
    name: 'Yuliana',
    age: 26,
    active: false,
    status: Status.Online
  };
  constructor(public navCtrl: NavController, public userService: UserProvider) {
    this.users = this.userService.get();
    this.userService.add(this.yuliana);
  }


  goToLogin() {
    this.navCtrl.push(LoginPage)
  }
  goToConversation(user) {
    this.navCtrl.push(ConversationPage, {data: user});
  }

}
