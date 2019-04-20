import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedbackPage } from '../feedback/feedback';
import { MethodsProvider } from '../../providers/methods/methods';
import { ClassPage } from '../class/class';
import { AppointmentsPage } from '../appointments/appointments';

/**
 * Generated class for the Page4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page4',
  templateUrl: 'page4.html',
})
export class Page4Page {
tutorsArr = new Array();
counter = 0;
  constructor(public alertCtrl: AlertController,public methods:MethodsProvider, public navCtrl: NavController, public navParams: NavParams) {
  this.getConfirmation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Page4Page');
  }

  ShowTutors(){
    console.log(this.tutorsArr);
      this.navCtrl.push(ClassPage, {tutors:this.tutorsArr})
  }

  getConfirmation(){
    this.methods.getOnlineUsers().then((data:any) =>{
      this.tutorsArr.length = 0;
      console.log('assign to array');
      this.tutorsArr = data;
      this.listenForResp();
    })
  }

  listenForResp(){
    if (this.counter >= 5){
      const prompt = this.alertCtrl.create({
        message: "There is no available tutor at the moment, Please try again after few minutes",
        buttons: [
          {
            text: 'Ok',
            handler: data => {
              console.log('Saved clicked');
              this.navCtrl.pop();
            }
          }
        ]
      });
      prompt.present();
    }
    else{
      setTimeout(() => {
        var resp = this.methods.getResp();
        if (resp == true)
          this.ShowTutors();
          else{
            this.listenForResp();
          }
        }, 4000);
    }
      this.counter++;
  }

}
