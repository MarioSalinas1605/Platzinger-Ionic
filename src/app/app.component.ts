import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, ModalController, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { RequestProvider } from '../providers/request/request';
import { User } from '../interfaces/user';
import { CoverPage } from '../pages/cover/cover';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CoverPage;

  pages: Array<{title: string, component: any}>;
  user: User

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private authProvider: AuthProvider,
    private app: App,
    private userProvider: UserProvider,
    private requestProvider: RequestProvider,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Profile', component: ProfilePage },
      { title: 'About', component: AboutPage }
    ];

    this.authProvider.getStatus().subscribe(
      (session)=>{
        this.userProvider.getUserById(session.uid).valueChanges().subscribe(
          (user:User)=>{
            this.user=user
            this.getFriendRequests()
          },
          (error)=>{
            console.log(error)
          }
        )
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
    this.authProvider.logOut()
    .then(
      ()=>{
        this.app.getRootNav().setRoot(LoginPage)
      }
    )
    .catch((error)=>console.log(error))
  }

  getFriendRequests(){
    this.requestProvider.getRequestsForEmail(this.user.email).valueChanges().subscribe(
      (requests: any)=>{
        console.log(requests)
      },
      (error)=>{
        console.log(error)
      }
    )
  }
}
