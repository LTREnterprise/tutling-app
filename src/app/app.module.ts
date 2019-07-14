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
import { AppointmentsPage } from '../pages/appointments/appointments';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SavedAppointmentsPage } from '../pages/saved-appointments/saved-appointments';
import { LocalNotifications } from '@ionic-native/local-notifications';
import {CanvasDraw} from '../components/canvas-draw/canvas-draw'
import { RecordingsPage } from '../pages/recordings/recordings';
import { ChattingPage } from '../pages/chatting/chatting';
import { SqlProvider } from '../providers/sql/sql';
import { SQLite } from '../../node_modules/@ionic-native/sqlite';
import { ChatsRecordingsPage } from '../pages/chats-recordings/chats-recordings';
import { PaymentPage } from '../pages/payment/payment';
import { TutorRegisterPage } from '../pages/tutor-register/tutor-register';
import { ProfilePage } from '../pages/profile/profile';
import { Tutorregister2Page } from '../pages/tutorregister2/tutorregister2';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUpPage,
    ClassPage,
    Page4Page,
    RequestPage,
    FeedbackPage,
    AppointmentsPage,
    SignInPage,
    SavedAppointmentsPage,
    RecordingsPage,
    CanvasDraw,
    ChattingPage,
    ChatsRecordingsPage,
    PaymentPage,
    TutorRegisterPage,
    ProfilePage,
    Tutorregister2Page
    
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
    AppointmentsPage,
    SignInPage,
    SavedAppointmentsPage,
    RecordingsPage,
    ChattingPage,
    ChatsRecordingsPage,
    PaymentPage,
    TutorRegisterPage,
    ProfilePage,
    Tutorregister2Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // AndroidPermissions,
    LocalNotifications,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MethodsProvider,
    SqlProvider,
    SQLite
  ]
})
export class AppModule {}
