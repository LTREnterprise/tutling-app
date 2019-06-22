import { Component } from '@angular/core';
import {LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { MethodsProvider } from '../../providers/methods/methods';
import { ClassPage } from '../class/class';
import { AppointmentsPage } from '../appointments/appointments';
import { ChattingPage } from '../chatting/chatting';

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
  tutors = this.navParams.get('tutors')
  sub;
  constructor(public loadingCtrl: LoadingController, public methods: MethodsProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.sub =  this.navParams.get('sub');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
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
        this.navCtrl.push(ClassPage, {tutors:i})
        }
        else if (i.channel == 'texting'){
          console.log(i);
          i.path = path
          console.log(i);
          this.methods.setPath(path, this.sub, i.key).then(() =>{
            this.navCtrl.push(ChattingPage, {tutors:i, sub:this.sub})
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
