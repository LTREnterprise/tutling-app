import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqlProvider } from '../../providers/sql/sql';
import { ChatsRecordingsPage } from '../chats-recordings/chats-recordings';

/**
 * Generated class for the RecordingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recordings',
  templateUrl: 'recordings.html',
})
export class RecordingsPage {
  chats = new Array();
  constructor(public sql:SqlProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  home(){
    this.navCtrl.pop();
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad RecordingsPage');
    this.sql.getAllConvo().then((data:any) =>{
      console.log(data);
     this.chats = data;
    })
  }
  viewMore(convo, date,sub, time, key){
    this.navCtrl.push(ChatsRecordingsPage, {id:convo, date:date, sub:sub, time:time, key:key})
  }
}
