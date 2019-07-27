import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { MethodsProvider } from '../../providers/methods/methods';
import { SavedAppointmentsPage } from '../saved-appointments/saved-appointments';
import { SignInPage } from '../sign-in/sign-in';
import { RecordingsPage } from '../recordings/recordings';
import { PaymentPage } from '../payment/payment';
import { ProfilePage } from '../profile/profile';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public methods:MethodsProvider, public navCtrl: NavController, public alertCtrl: AlertController, public platform: Platform) {
  
  }

 



  Payment(){
      this.navCtrl.push(PaymentPage)
  }

  Recordings(){
    this.navCtrl.push(RecordingsPage)
  }

  Appointments(){
    this.navCtrl.push(SavedAppointmentsPage)
  }
  
  Profile(){
  this.navCtrl.push(ProfilePage)
  }

  logout(){
    const confirm = this.alertCtrl.create({
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.methods.logout().then(()=>{
              this.navCtrl.setRoot(SignInPage)
            })
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}
