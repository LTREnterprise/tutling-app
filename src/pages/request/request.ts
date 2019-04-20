import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Page4Page } from '../page4/page4';
import { HomePage } from '../home/home';
import { MethodsProvider } from '../../providers/methods/methods';

/**
 * Generated class for the RequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {
  private buttonColor: string = "primary";
  private buttonColor2: string = "primary";
  channel = null;
  date = null;
  time = null;
  minDate: string = new Date().toISOString();
  minTime : string = new Date().toLocaleTimeString(); 


  constructor(public method: MethodsProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
    
  }
  home(){
    this.navCtrl.push(HomePage)
  }
  comType(type){
    if (type == "video"){
      if (this.buttonColor == "light"){
        this.buttonColor = "primary"
        this.buttonColor2 = "primary"
        this.channel = null;
      }
      else{
        this.buttonColor = "light"
        this.buttonColor2 = "primary"
        this.channel = "video"
        // this.videoCall();
      }

    }
    else{
      if (this.buttonColor2 == "light"){
        this.buttonColor = "primary"
        this.buttonColor2 = "primary"
        this.channel = null;
      }
      else{
        this.buttonColor2 = "light"
        this.buttonColor = "primary"
        this.channel = "texting"
      }
    }
  }

  videoCall(){
    this.navCtrl.push(Page4Page)
  }

  request(){
    console.log(this.date);
    console.log(this.time);
    
    
    if (this.channel != null && this.date == null && this.time == null){
      const prompt = this.alertCtrl.create({
        message: "Are you sure you want to instantly request a tutor",
        buttons: [
          {
            text: 'Disagree',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Agree',
            handler: data => {
            this.method.setRequest();
              this.videoCall();
            }
          }
        ]
      });
      prompt.present();
    }
    else if (this.channel ==  null){
      const prompt = this.alertCtrl.create({
        message: "Please select the communication type between video and texting",
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
    else if (this.date == null){
      const prompt = this.alertCtrl.create({
        message: "Please select the date for the appointment",
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
    else if (this.time ==  null){
      const prompt = this.alertCtrl.create({
        message: "Please select the time for the appointment",
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
    else if (this.channel != null && this.date != null && this.time != null){
      this.method.setAppontment(this.date,this.time," ", " ", this.channel).then(() =>{
        const prompt = this.alertCtrl.create({
          message: "Your Appointment has been scheduled",
          buttons: [
            {
              text: 'Ok',
              handler: data => {
                this.date = "";
                this.time = "";
                this.buttonColor = "primary"
                this.buttonColor2 = "primary"
                console.log('Saved clicked');
              }
            }
          ]
        });
        prompt.present();
      })
    }
  }
}
