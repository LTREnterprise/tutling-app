import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Tutorregister2Page } from '../tutorregister2/tutorregister2';
import { MethodsProvider } from '../../providers/methods/methods';
import { FormGroupDirective } from '@angular/forms';


/**
 * Generated class for the TutorRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tutor-register',
  templateUrl: 'tutor-register.html',
})
export class TutorRegisterPage {

  name = "";
  email = "";
  bDate = "";
  idNum = "";
  cellNum = "";
  University = "";
  highScll = "";
  Primary = "";
  eduLevel = "";
  pass = "";
  confmPass = "";


  constructor(public navCtrl: NavController, public navParams: NavParams, public methods:MethodsProvider, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorRegisterPage');
  }
  logScrolling(event){
    // console.log(event.scrollTop);
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

  leadToNextPage(){
    if (this.confmPass != this.pass){
        const alert = this.alertCtrl.create({
          subTitle:'passwords do not match',
          buttons: [
            {
              text: "OK",
              handler: data => {
                console.log("Cancel clicked");
              }
            }
          ]
        });
        alert.present();
    }else{
      this.methods.registerTutor(this.name,this.email,this.idNum,this.bDate,this.cellNum,this.eduLevel,this.highScll,this.Primary,this.University,this.pass).then(() =>{
        this.navCtrl.push(Tutorregister2Page)
      })
    }
 
  
  }
}
