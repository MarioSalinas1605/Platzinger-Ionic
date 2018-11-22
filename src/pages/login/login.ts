import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User, Status } from '../../interfaces/user';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  password: string;
  password2: string;
  email: string;
  status: Status;
  nick: string;
  operation: string = 'login';
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider,
    public userService: UserProvider,private toastCtrl: ToastController) {
    this.operation = 'login'
  }

  registerWithEmail() {
    if(this.password !== this.password2) {
      alert('Las contraseñas no coinciden');
      return;
    }
    this.authProvider.registerWithEmail(this.email, this.password).then((data) => {
      const user: User = {
        nick: this.nick,
        email: this.email,
        status: this.status,
        uid: data.user.uid,
        active: true
      };
      this.userService.createUser(user).then((data) => {
        let toast = this.toastCtrl.create({
          message: 'Usuario registrado con éxito',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.operation = 'login';
        console.log(data);
      }).catch((error) => {
        alert('Ocurrió un error');
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  }
  loginWithEmail() {
    this.authProvider.loginWithEmail(this.email, this.password).then((data) => {
      console.log(data);
      let toast = this.toastCtrl.create({
        message: 'Bienvenido',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.setRoot(HomePage);
    }).catch((error) => {
      alert('Ocurrió un error');
      console.log(error);
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }
  backToHome() {
    this.navCtrl.pop();
  }

}
