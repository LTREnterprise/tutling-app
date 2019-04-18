import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedbackPage } from '../feedback/feedback';
import { MethodsProvider } from '../../providers/methods/methods';

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

  constructor(public methods:MethodsProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.methods.getOnlineUsers().then((data:any) =>{
      this.tutorsArr = data;
      console.log(this.tutorsArr);
      this.ShowTutors();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Page4Page');
  }

  ShowTutors(){
    setTimeout(() => {
      this.navCtrl.push(FeedbackPage, {tutors:this.tutorsArr})
    }, 1500);
  }

}
