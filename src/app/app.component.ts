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
import { SignInPage } from '../pages/sign-in/sign-in';
import { MethodsProvider } from '../providers/methods/methods';
import { ChatsRecordingsPage } from '../pages/chats-recordings/chats-recordings';
import { TutorRegisterPage } from '../pages/tutor-register/tutor-register';
import { ProfilePage } from '../pages/profile/profile';
import { Tutorregister2Page } from '../pages/tutorregister2/tutorregister2';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(public methods:MethodsProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.methods.checkstate().then((results:any) =>{
        if (results == 1) {
          // this.methods.setUserOnline();
          this.rootPage = Tutorregister2Page;
        }
        else {
          this.rootPage = SignInPage
        }
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}