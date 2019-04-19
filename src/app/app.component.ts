import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { AndroidPermissions } from '@ionic-native/android-permissions';
import { HomePage } from '../pages/home/home';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ClassPage } from '../pages/class/class';
import { Page4Page } from '../pages/page4/page4';
import { RequestPage } from '../pages/request/request';
import { FeedbackPage } from '../pages/feedback/feedback';
import { AppointmentsPage } from '../pages/appointments/appointments';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor( platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // androidPermissions.requestPermissions(
      //   [
      //     androidPermissions.PERMISSION.CAMERA, 
      //     androidPermissions.PERMISSION.CALL_PHONE, 
      //     androidPermissions.PERMISSION.GET_ACCOUNTS, 
      //     androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, 
      //     androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      //   ]
      // );
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}