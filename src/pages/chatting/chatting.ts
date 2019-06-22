import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController, NavParams, LoadingController, Keyboard } from 'ionic-angular';
import { MethodsProvider } from '../../providers/methods/methods';
import { LocalNotifications } from '@ionic-native/local-notifications';
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
mssg = ""
Messages = new Array();
currentUserId
counter = 0;
sub;
minutes = 4;
minREf = 0;
seconds = 0;
secRef = 0;
convo;
  constructor(  private keyboard: Keyboard, private localNotifications: LocalNotifications,public loadingCtrl: LoadingController,public methods: MethodsProvider, public navCtrl: NavController, public navParams: NavParams) {
    let loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Please wait....",
    });
    this.sub =  this.navParams.get('sub');
    loading.present();
    this.timer();
    this.currentUserId = this.methods.getUserID();
    console.log(this.currentUserId);
    this.user = this.navParams.get('tutors');
//tutor

    //  this.path =  this.user.path;
    // console.log(this.user);
    // console.log(this.user.path);

    //student
    this.path =  this.user[0].path;
    this.methods.getMessages(this.path).then((data:any) =>{
      console.log('get messages');
      if (this.counter == 0){
        this.setConvo(data[0].convo)
      }
      console.log(this.convo);
      this.Messages = data;
      this.Messages.splice(0)
      this.counter++;
     setTimeout(() => {
      loading.dismiss();
     }, 2300);
  
      // this.Messages.reverse();
    })
  }

  setConvo(conv){
    this.convo = conv
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChattingPage');
  }

  getMessages(){

  }

  sendMessage(){
    console.log(this.mssg);
    if (this.mssg != ""){
      this.methods.sendMessage(this.path,this.mssg, this.convo);
      this.mssg = "";
    }
 
  }


  timer(){
    setTimeout(() => {
      if (this.seconds == 0){
        if (this.minutes != 0){
        if (this.minutes  <= 9)
          this.minREf = 0;
          else 
          this.minREf = null;
        this.seconds = 59;
        this.secRef = null
        this.minutes--
        if (this.minutes == 1 ){
          this.showNotification(2, 'minutes')
        }
        else if (this.minutes == 0){
        
          this.showNotification(60,'seconds')
        }
        }
        else {
          console.log('time stopped');
          
        }
      }
      else{
        if (this.minutes  <= 9)
        this.minREf = 0;
        if (this.seconds <= 10){
          this.secRef = 0
        }
        this.seconds--;
      }
      this.timer();
    }, 1000);

}

showNotification(time, interval){
  this.localNotifications.schedule([{
    id: 1,
    title: 'Education App',
    text: 'You have less than ' + time + ' ' + interval + ' remaining, top up now?',
    icon: 'http://example.com/icon.png'
 }]);
 
}


}
