import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { MethodsProvider } from '../../providers/methods/methods';
import { RequestPage } from '../request/request';

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
      this.methods.signIn(this.email, this.pass).then(() =>{
        this.navCtrl.push(RequestPage)
      })
    }
  }
  
  btnClick(){
    alert('clickable')
  }

  leadToSignUp(){
    this.navCtrl.push(SignUpPage)
  }

}
