import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// import { AndroidPermissions } from '@ionic-native/android-permissions';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ClassPage } from '../pages/class/class';
import { Page4Page } from '../pages/page4/page4';
import { RequestPage } from '../pages/request/request';
import { FeedbackPage } from '../pages/feedback/feedback';
import { MethodsProvider } from '../providers/methods/methods';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUpPage,
    ClassPage,
    Page4Page,
    RequestPage,
    FeedbackPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUpPage,
    ClassPage,
    Page4Page,
    RequestPage,
    FeedbackPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MethodsProvider
  ]
})
export class AppModule {}
