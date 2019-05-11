import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public methods: MethodsProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.currentUserId = this.methods.getUserID();
    console.log(this.currentUserId);
    this.user = this.navParams.get('tutors');
    this.path =  this.user[0].path;
    console.log(this.user);
    this.methods.getMessages(this.path).then((data:any) =>{
      this.Messages = data;
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
