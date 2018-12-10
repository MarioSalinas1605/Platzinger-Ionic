import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { User, Status } from '../../interfaces/user';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';
import { ConversationPage } from '../conversation/conversation';
import { AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { RequestProvider } from '../../providers/request/request';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: any =[];
  user: User
  constructor(public navCtrl: NavController,
    public userService: UserProvider,
    public alertCtrl: AlertController,
    private authProvider: AuthProvider,
    private requestProvider: RequestProvider,
    public toastCtrl: ToastController) {
    this.userService.getUsers().valueChanges()
    .subscribe((usersFB)=>{
      this.users = usersFB
      console.log(usersFB)
    })

    this.authProvider.getStatus().subscribe(
      (session)=>{
        if (session) {
          this.userService.getUserById(session.uid).valueChanges().subscribe(
            (user:User)=>{
              this.user = user
              this.user.friends = Object.keys(this.user.friends).map(key=>this.user.friends[key])
              console.log(user)
            },
            (error)=>{
              console.log(error)
            }
          )
        }

      },
      (error)=>{
        console.log(error)
      }
    )
  }


  goToLogin() {
    this.navCtrl.push(LoginPage)
  }


  sendRequest(){
    const prompt = this.alertCtrl.create({
      title: 'Agregar amigo',
      message: "Ingresa el email del amigo para agregar",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log(data);
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            const request = {
              timestamp: Date.now(),
              receiver_email: data.email,
              sender: this.user.uid,
              status: 'pending'
            }
            this.requestProvider.createRequest(request)
            .then(
              (data)=>{
                const toast = this.toastCtrl.create({
                  message: 'Solicitud enviada',
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();
              }
            )
            .catch(
              (error)=>{
                console.log(error)
              }
            )
          }
        }
      ]
    });
    prompt.present()
  }

}
