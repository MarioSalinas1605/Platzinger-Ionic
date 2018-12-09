import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cover',
  templateUrl: 'cover.html',
})
export class CoverPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider) {
      this.authProvider.getStatus().subscribe(
        (session)=>{
          if (session) {
              this.navCtrl.setRoot(HomePage)
          }
          else{
            this.navCtrl.setRoot(LoginPage)
          }
        },
        (error)=>{
          console.log(error)
        }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoverPage');
  }

}
