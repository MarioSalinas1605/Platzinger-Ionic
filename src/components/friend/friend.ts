import { Component, Input, OnInit } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../interfaces/user';
import { NavController } from 'ionic-angular';
import { ConversationPage } from '../../pages/conversation/conversation';

/**
 * Generated class for the FriendComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'friend',
  templateUrl: 'friend.html'
})
export class FriendComponent implements OnInit{
  friend: User
  text: string;
  @Input() uid: string
  constructor(private userProvider: UserProvider, public navCtrl: NavController) {
    console.log('Hello FriendComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit(){
    this.userProvider.getUserById(this.uid).valueChanges().subscribe(
      (data:User)=>{
        this.friend = data
        console.log(this.friend)
      },
      (error)=>{
        console.log(error)
      }
    )
    console.log(this.uid)
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
