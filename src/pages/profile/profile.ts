import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'
import {HttpClient} from "@angular/common/http";

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    public httpClient: HttpClient) {
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
