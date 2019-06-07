import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MethodsProvider } from '../../providers/methods/methods';

/**
 * Generated class for the ChattingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatting',
  templateUrl: 'chatting.html',
})
export class ChattingPage {
user;
path;
mssg;
Messages = new Array();
currentUserId
counter = 0;
sub;
  constructor(public loadingCtrl: LoadingController,public methods: MethodsProvider, public navCtrl: NavController, public navParams: NavParams) {
    let loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Please wait....",
    });
    this.sub =  this.navParams.get('sub');
    loading.present();
    this.currentUserId = this.methods.getUserID();
    console.log(this.currentUserId);
    this.user = this.navParams.get('tutors');
     this.path =  this.user.path;
    console.log(this.user);
    console.log(this.user.path);
    //this.path =  this.user[0].path;
    this.methods.getMessages(this.path).then((data:any) =>{
      console.log('get messages');
      this.Messages = data;
      this.counter++;
     setTimeout(() => {
      loading.dismiss();
     }, 2300);
  
      // this.Messages.reverse();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChattingPage');
  }

  getMessages(){

  }

  sendMessage(){
    console.log(this.mssg);
    this.methods.sendMessage(this.path,this.mssg);
    this.mssg = "";
  }

}
