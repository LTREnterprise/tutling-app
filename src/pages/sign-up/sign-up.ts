import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  leadToNextPage(){
    this.navCtrl.push(HomePage)
  }

  logScrolling(event){
    console.log(event.scrollTop);
    let theNav = document.getElementsByClassName("nav") as HTMLCollectionOf <HTMLElement>;
    let appName = document.getElementById("appName-Top");
    if(event.scrollTop < 140){
      theNav[0].style.background = "transparent"
      appName.style.display = "none"
    }
    else{
      theNav[0].style.background = "rgb(75,75,75)"
      appName.style.display = "block"
    }
    
  }
  logScrollStart(){
    // console.log("Start");
    
  }
  logScrollEnd(){
    // console.log("end");
    
  }


}
