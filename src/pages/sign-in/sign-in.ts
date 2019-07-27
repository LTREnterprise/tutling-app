import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { MethodsProvider } from '../../providers/methods/methods';
import { RequestPage } from '../request/request';
import { TutorRegisterPage } from '../tutor-register/tutor-register';
import { FeedbackPage } from '../feedback/feedback';

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
email = null;
pass = null;
  constructor(public methods:MethodsProvider, public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  login(){
    if (this.email == null || this.email == ""){
      const prompt = this.alertCtrl.create({
        message: "Please enter your email address",
        buttons: [
          {
            text: 'Ok',
            handler: data => {
              console.log('Saved clicked');
            }
          }
        ]
      });
      prompt.present();
    }
    else if (this.pass == null ||  this.pass == ""){
      const prompt = this.alertCtrl.create({
        message: "Please enter the password",
        buttons: [
          {
            text: 'Ok',
            handler: data => {
              console.log('Saved clicked');
            }
          }
        ]
      });
      prompt.present();
    }
    else{
      this.methods.signIn(this.email, this.pass).then((data:any) =>{
        if (data == 1)
          this.navCtrl.setRoot(FeedbackPage)
        else
         this.navCtrl.setRoot(RequestPage)
      })
    }
  }
  
  btnClick(){
    alert('clickable')
  }

  leadToSignUp(){
    const confirm = this.alertCtrl.create({
      message: 'Please select the type of user you want to register as!',
      buttons: [
        {
          text: 'Tutor',
          handler: () => {
            this.navCtrl.push(TutorRegisterPage)
          }
        },
        {
          text: 'Student',
          handler: () => {
            this.navCtrl.push(SignUpPage)
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
    
  }

}
