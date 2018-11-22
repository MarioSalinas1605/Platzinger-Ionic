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
  users: any =[];

  constructor(public navCtrl: NavController, public userService: UserProvider) {
    this.userService.getUsers().valueChanges()
    .subscribe((usersFB)=>{
      this.users = usersFB
      console.log(usersFB)
    })
  }


  goToLogin() {
    this.navCtrl.push(LoginPage)
  }
  goToConversation(user) {
    this.navCtrl.push(ConversationPage, {data: user});
  }
  getIconByStatus(status){
    let icon = ''
    switch(status){
      case 'Online':
        icon = 'logo_live_online.png'
        break
        case 'Offline':
          icon = 'logo_live_offline.png'
          break
        case 'Busy':
          icon = 'logo_live_busy.png'
          break
        case 'Away':
          icon = 'logo_live_away.png'
          break
        case 'AppearOffline':
          icon = 'logo_live_appear_offline.png'
          break
    }
    return icon
  }
}
