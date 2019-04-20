import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ThrowStmt } from '@angular/compiler';
import { MethodsProvider } from '../../providers/methods/methods';
import { RequestPage } from '../request/request';

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
  name = null;
  email = null;
  bDate = null;
  idNum = null;
  cellNum = null;
  University = null;
  highScll = null;
  Primary = null;
  eduLevel = null;
  pass = null;
  confmPass = null;

  constructor(public methods: MethodsProvider, public alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  leadToNextPage(){
    if (this.name == null || this.name == ""){
      const prompt = this.alertCtrl.create({
        message: "Please enter your full name",
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
    else if (this.email == null || this.email == ""){
      const prompt = this.alertCtrl.create({
        message: "Please enter your Email address",
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
    else if (this.bDate == null || this.bDate == ""){
      const prompt = this.alertCtrl.create({
        message: "Please enter your Birth date",
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
    else if (this.idNum == null || this.idNum == ""){
      const prompt = this.alertCtrl.create({
        message: "Please enter your ID number",
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
    else if (this.cellNum == null || this.cellNum == ""){
      const prompt = this.alertCtrl.create({
        message: "Please enter your Mobile number",
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
    else if (this.University == null || this.University == ""){
      const prompt = this.alertCtrl.create({
        message: "Please enter the name of your University",
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
    else if (this.highScll == null || this.highScll == ""){
      const prompt = this.alertCtrl.create({
        message: "Please enter the name of the High school you went to",
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
    else if (this.Primary == null || this.Primary == ""){
      const prompt = this.alertCtrl.create({
        message: "Please enter the name of the Primary school you went to",
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
    else if (this.eduLevel == null || this.eduLevel == ""){
      const prompt = this.alertCtrl.create({
        message: "Please enter your education level",
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
    else if (this.pass == null || this.pass == ""){
      const prompt = this.alertCtrl.create({
        message: "Please enter the Password",
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
    else if (this.confmPass == null || this.confmPass == ""){
      const prompt = this.alertCtrl.create({
        message: "Please confirm your password",
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
    else if (this,this.confmPass != this.pass){
      const prompt = this.alertCtrl.create({
        message: "Please make sure that the passwords match",
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
    else{
        this.methods.register(this.name, this.email, this.idNum, this.bDate, this.cellNum, this.eduLevel, this.highScll, this.Primary, this.University, this.pass).then(() =>{
         this.navCtrl.push(RequestPage)
        })
    }
    
  
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
  back(){
    this.navCtrl.pop();
  }

}
