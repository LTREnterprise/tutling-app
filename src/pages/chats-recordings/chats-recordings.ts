import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SqlProvider } from '../../providers/sql/sql';

/**
 * Generated class for the ChatsRecordingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chats-recordings',
  templateUrl: 'chats-recordings.html',
})
export class ChatsRecordingsPage {
  Messages = new Array();
  id = this.navParams.get('id')
  date = this.navParams.get('date')
  sub = this.navParams.get('sub')
  time = this.navParams.get('time')
  currentUserId = this.navParams.get('key')
  constructor(public loadingCtrl:LoadingController, public sql:SqlProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Please wait....",
    });
    loading.present();
    this.sql.GetAllFavourite(this.id).then((data:any) =>{
      this.Messages = data
      setTimeout(() => {
        loading.dismiss()
      }, 2000);
    })
  }

}
