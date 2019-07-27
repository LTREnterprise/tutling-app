import { Component } from '@angular/core';
import {LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { MethodsProvider } from '../../providers/methods/methods';
import { ClassPage } from '../class/class';
import { AppointmentsPage } from '../appointments/appointments';
import { ChattingPage } from '../chatting/chatting';
import { TutorChatPage } from '../tutor-chat/tutor-chat';
import { HomePage } from '../home/home';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})

export class FeedbackPage {
  tutors = new Array();
  sub;
  constructor(public loadingCtrl: LoadingController, public methods: MethodsProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.getConfirmation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  getConfirmation(){
    this.methods.getOnlineUsers().then((data:any) =>{
      this.tutors.length = 0;
      console.log('assign to array');
      this.tutors = data;
      // this.ShowTutors();
    })
  }

  home(){
    this.navCtrl.push(HomePage)
  }

  accept(i){
    this.methods.approveLesson(i).then((path) =>{
      let loading = this.loadingCtrl.create({
        spinner: "bubbles",
        content: "Please wait....",
      });
      loading.present();
      setTimeout(() => {
        if (i.channel == 'video'){
          loading.dismiss()
        this.navCtrl.push( AppointmentsPage, {tutors:i})
        }
        else if (i.channel == 'texting'){
          console.log(i);
          i.path = path
          console.log(i);
          this.methods.setPath(path, this.sub, i.key).then(() =>{
            this.navCtrl.push(TutorChatPage, {tutors:i, sub:this.sub})
            loading.dismiss();
          })
        }
      }, 2500);
    })
  }
  decline(i){
    console.log(i);
  }
}
