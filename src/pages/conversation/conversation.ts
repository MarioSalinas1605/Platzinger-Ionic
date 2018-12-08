import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { Vibration } from '@ionic-native/vibration';
import { ConversationProvider } from '../../providers/conversation/conversation';

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
  friend: User;
  conversationId: any;
  message: string;
  conversation: any;
  shake: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider, public userService: UserProvider, public conversationService: ConversationProvider, public vibration: Vibration) {
    this.friend = this.navParams.get('data');
    console.log(this.friend);
    this.authService.getStatus().subscribe((data) => {
      this.userService.getUserById(data.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        console.log(this.user);
        let idsArray = [this.user.uid, this.friend.uid].sort();
        this.conversationId = idsArray.join('|');
        this.getConversation();
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    })
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
  sendMessage() {
    const messageObject: any = {
      uid: this.conversationId,
      timestamp: Date.now(),
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'text',
      text: this.message
    };
    this.conversationService.add(messageObject).then((data) => {
      this.message = '';
    }).catch((error) => {
      console.log(error);
    });
  }
  doZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    this.vibration.vibrate([200, 80, 150]);
    window.setTimeout(() => {
      this.shake = false;
    }, 800);
  }
  sendZumbido() {
    const messageObject: any = {
      uid: this.conversationId,
      timestamp: Date.now(),
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'zumbido'
    };
    this.conversationService.add(messageObject).then((data) => {
      this.doZumbido();
    }).catch((error) => {
      console.log(error);
    });
  }
  getConversation() {
    this.conversationService.getById(this.conversationId).valueChanges().subscribe((data) => {
      this.conversation = data;
    }, (error) => {
      console.log(error);
    })
  }
  getUserNickById(uid) {
    if (uid === this.friend.uid) {
      return this.friend.nick;
    } else {
      return this.user.nick;
    }
  }

}
