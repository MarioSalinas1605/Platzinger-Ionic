import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'
import {HttpClient} from "@angular/common/http";
import { User } from '../../interfaces/user';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    public httpClient: HttpClient,
    private authProvider: AuthProvider,
    private userProvider: UserProvider,
    private alertCtrl: AlertController) {
      this.geolocation.getCurrentPosition().then((resp) => {
      // this.httpClient.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+resp.coords.latitude+','+resp.coords.longitude+'&sensor=true/false').subscribe((data: any) => {
      //   console.log(data.results[0]);

      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)
      }, (error) => {
        console.log(error);
      });

    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });

    this.authProvider.getStatus().subscribe(
      (data)=>{
        if (data) {
          this.userProvider.getUserById(data.uid).valueChanges().subscribe(
            (user:any)=>{
              this.user = user
              console.log(this.user)
            },
            (error)=>{console.log(error)}
          )
        }

      },
      (error)=>{console.log(error)}
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  saveData(){
    this.userProvider.editUser(this.user)
    .then((data)=>{
      let alert = this.alertCtrl.create({
        title: 'Perfecto!',
        subTitle: 'Se han guardado tus cambios',
        buttons: ['Ok']
      });
      alert.present();
    })
    .catch((error)=>{console.log(error)})
  }

}
