import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Page4Page } from '../page4/page4';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
  }
  comType(type){
    if (type == "video"){
      if (this.buttonColor == "light"){
        this.buttonColor = "primary"
        this.buttonColor2 = "primary"
      }
      else{
        this.buttonColor = "light"
        this.buttonColor2 = "primary"
        this.videoCall();
      }

    }
    else{
      if (this.buttonColor2 == "light"){
        this.buttonColor = "primary"
        this.buttonColor2 = "primary"
      }
      else{
        this.buttonColor2 = "light"
        this.buttonColor = "primary"
      }
    }
  }

  videoCall(){
    this.navCtrl.push(Page4Page)
  }

}
