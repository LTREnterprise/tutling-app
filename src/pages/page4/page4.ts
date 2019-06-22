import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedbackPage } from '../feedback/feedback';
import { MethodsProvider } from '../../providers/methods/methods';
import { ClassPage } from '../class/class';
import { AppointmentsPage } from '../appointments/appointments';
import { ChattingPage } from '../chatting/chatting';

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
channel;
sub; 
course;
  constructor(public alertCtrl: AlertController,public methods:MethodsProvider, public navCtrl: NavController, public navParams: NavParams) {
  this.channel =  this.navParams.get('channel');
  this.sub =  this.navParams.get('sub');
  this.course =  this.navParams.get('course')
  console.log(this.sub);
  console.log(this.course);
  console.log(this.channel);
    this.getConfirmation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Page4Page');
  }

  ShowTutors(){
    console.log(this.tutorsArr);
    if (this.channel == 'texting'){
      setTimeout(() => {
        this.navCtrl.push(ChattingPage, {tutors:this.tutorsArr,sub:this.sub})
      }, 200);

    }
    else if (this.channel == 'video'){
      setTimeout(() => {
        this.navCtrl.push(ClassPage, {tutors:this.tutorsArr, sub:this.sub})
      }, 200);

    }
   
  }

  getConfirmation(){
    this.methods.getOnlineUsers().then((data:any) =>{
      this.tutorsArr.length = 0;
      console.log('assign to array');
      this.tutorsArr = data;
      this.listenForResp();
      // this.ShowTutors();
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
        // console.log('please wait');
          this.ShowTutors();
          else{
            this.listenForResp();
          }
        }, 4300);
    }
      this.counter++;
  }

}
