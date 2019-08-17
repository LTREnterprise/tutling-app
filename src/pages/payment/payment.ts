import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  minutes = undefined;
  channel = undefined;
  Year = undefined;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,private iab: InAppBrowser) {
  }
  home(){
    this.navCtrl.pop();
  }
  
  ionViewDidLoad() {
  
  }


  pay(){
    var price = 0;

    if (this.minutes == undefined){
 const confirm = this.alertCtrl.create({
      message: 'Please the number of minutes you would like to purchase',
      buttons: [
        {
          text: 'OK',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
    }
    else if (this.channel == undefined){
      const confirm = this.alertCtrl.create({
      message: 'Please select the type of communication you desire',
      buttons: [
        {
          text: 'OK',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
    }
    else if (this.Year == undefined){
      const confirm = this.alertCtrl.create({
        message: 'Please select the year that you are doing',
        buttons: [
          {
            text: 'OK',
            handler: () => {
            }
          }
        ]
      });
      confirm.present();
    }
    else{
        if ((this.Year == 1 || this.Year == 2 || this.Year == 3) && this.channel == 'Texting'){
          if (this.minutes == 60){
            price = 100;
          }
          else if (this.minutes == 30){
              price = 50
          }
        }
        else if (this.Year == 4 && this.channel == 'Texting'){
          if (this.minutes == 60){
            price = 140;
          }
          else if (this.minutes == 30){
              price = 70
          }
        }
        else if ((this.Year == 1 || this.Year == 2 || this.Year == 3) && this.channel == 'video'){
          if (this.minutes == 60){
            price = 150;
          }
          else if (this.minutes == 30){
              price = 75
          }
        }
        else if (this.Year == 4 && this.channel == 'video'){
          if (this.minutes == 60){
            price = 250;
          }
          else if (this.minutes == 30){
              price = 125
          }
        }
      

      console.log(price)
        const confirm = this.alertCtrl.create({
          title: 'Payment',
          message: 'Purchasing ' + this.minutes + ' minutes will cost R' + price + ' do you agree to continue?',
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
              this.makePayment(price)
              }
            }
          ]
        });
        confirm.present();
      }
  }

  makePayment(price){
    var url;
     url = 'https://www.landsea.co.za/qrcode/BUTTON.php?amount=' + price;
    const browser = this.iab.create(url);
    browser.on('exit').subscribe(event =>{
      console.log('closed');
    })

    browser.on('loadstart').subscribe(event =>{
      console.log(event.url);
    })
  
  }

}
