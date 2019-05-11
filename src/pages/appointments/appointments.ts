import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { LoadingController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { MethodsProvider } from '../../providers/methods/methods';
declare var iosrtc;
declare var apiRTC;
declare var apiCC;

const STATE_WAIT = "wait";
const STATE_INCALL = "incall";

const LABEL_CALL = "Call";
const LABEL_HANGOUT = "Hangup";

const COLOR_CALL = "#5cb85c";
const COLOR_HANGOUT = "#d9534f";
/**
 * Generated class for the AppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html',
})
export class AppointmentsPage {
  distantNumber:any;
  webRTCClient:any;
  infoLabel:any;
  buttonLabel:any;
  buttonColor:any;
  state:any;
  user;
  loading ;
  message;
  checkState=0;
  varTxt=0;
  minREf = 0;
  minutes = 0;
  secRef =0;
  seconds =0;
  constructor(public loadingCtrl: LoadingController,public methods:MethodsProvider,public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Please wait",
    });
    this.loading.present();
    this.user = this.navParams.get('tutors');
   console.log(this.user);
    this.incomingCallHandler = this.incomingCallHandler.bind(this);
    this.userMediaErrorHandler = this.userMediaErrorHandler.bind(this);
    this.remoteStreamAddedHandler = this.remoteStreamAddedHandler.bind(this);
    this.hangupHandler = this.hangupHandler.bind(this);
    this.refreshVideoView = this.refreshVideoView.bind(this);
    this.sessionReadyHandler = this.sessionReadyHandler.bind(this);
    this.userMediaSuccessHandler = this.userMediaSuccessHandler.bind(this);
    apiRTC.init({
      onReady: this.sessionReadyHandler,
      apiKey: "myDemoApiKey"
    });
    
    this.infoLabel= "Registration Ongoing...";
    this.buttonLabel = LABEL_CALL;
    this.buttonColor = COLOR_CALL;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassPage');
  }
  pushCall(event) {
    console.log("Push, callState="+this.state);
    if(this.distantNumber && this.state == STATE_WAIT) {
      this.loading.dismiss();
      setTimeout(this.refreshVideoView,4000);
      this.webRTCClient.call(this.distantNumber);
    } else if(this.state == STATE_INCALL) {
      this.state = STATE_WAIT;
      this.buttonColor = COLOR_CALL;
      this.buttonLabel = LABEL_CALL;
      this.webRTCClient.hangUp();
    }
  }

  sessionReadyHandler(e) {
    console.log("sessionReadyHandler");
    apiRTC.addEventListener("incomingCall", this.incomingCallHandler);
    apiRTC.addEventListener("userMediaError", this.userMediaErrorHandler);
    apiRTC.addEventListener("remoteStreamAdded", this.remoteStreamAddedHandler);
    apiRTC.addEventListener("userMediaSuccess", this.userMediaSuccessHandler);
    apiRTC.addEventListener("hangup", this.hangupHandler);
    this.webRTCClient = apiCC.session.createWebRTCClient({});
    this.infoLabel = apiCC.session.apiCCId;
    this.state = STATE_WAIT;
    this.pushCall(event);
    this.getID();
  }
path;
  getText(){
    this.methods.getTextArea(this.path).then((chat:any) =>{
      this.message = "";
      this.message = chat;
      this.refreshMessages();
  })
  }

  refreshMessages(){
    setTimeout(() => {
      this.getText();
    }, 1200);
  }

  typeMessage(event){
    this.methods.updateTextAreaChat(this.message,this.path);
   }

  getID(){
    this.methods.getId(this.user.key).then((data:any) =>{
      console.log(data);
      if (data != 0){
        this.path = this.user.key + "/" + this.user.user;
        console.log(this.path);
        this.distantNumber = data;
        console.log(this.distantNumber);
        this.getText();
        this.pushCall(event)
      }
      else{
        setTimeout(() => {
          this.getID();
        }, 4200);
      }
    })
  }

  refreshVideoView() {
    if (this.platform.is('ios')) {
      console.log("REFRESH");
      iosrtc.refreshVideos();
    }
  }

  incomingCallHandler(e) {
    console.log("incomingCallHandler");
    this.state = STATE_INCALL;
    this.buttonColor = COLOR_HANGOUT;
    this.buttonLabel = LABEL_HANGOUT;
    setTimeout(this.refreshVideoView,2000);
  }

  hangupHandler(e) {
    console.log("hangupHandler");
    this.state = STATE_WAIT;
    this.buttonColor = COLOR_CALL;
    this.buttonLabel = LABEL_CALL;
    this.initMediaElementState(e.detail.callId);
  }

  userMediaSuccessHandler(e) {
    console.log("userMediaSuccessHandler",e);
    this.webRTCClient.addStreamInDiv(
      e.detail.stream,
      e.detail.callType,
      "mini",
      'miniElt-' + e.detail.callId,
      {width : "60px", height : "96px"},
      true
    );
  }

  userMediaErrorHandler(e) {
  }

  remoteStreamAddedHandler(e) {
    console.log("remoteStreamAddedHandler",e);
    this.state = STATE_INCALL;
    this.buttonColor = COLOR_HANGOUT;
    this.buttonLabel = LABEL_HANGOUT;
    this.webRTCClient.addStreamInDiv(
      e.detail.stream,
      e.detail.callType,
      "remote",
      'remoteElt-' + e.detail.callId,
      {},
      false
    );
    setTimeout(this.refreshVideoView,1000);
  }

  initMediaElementState(callId) {
    this.webRTCClient.removeElementFromDiv('mini', 'miniElt-' + callId);
    this.webRTCClient.removeElementFromDiv('remote', 'remoteElt-' + callId);
  }
  showHideOpts() {

    var theNav = document.getElementsByClassName("head") as HTMLCollectionOf<HTMLElement>;
    var theOpts = document.getElementsByClassName("options") as HTMLCollectionOf<HTMLElement>;
    if (this.checkState == 0) {
      this.checkState = 1
      console.log("show");
      theNav[0].style.top = "-100px";
      theOpts[0].style.top = "-110px";
    }
    else {
      this.checkState = 0;

      theNav[0].style.top = "0px";
      theOpts[0].style.top = "45px";
      console.log("hide");
    }
  }
  showHideText() {
    var switcherBtn = document.getElementsByClassName("closeOpen") as HTMLCollectionOf<HTMLElement>;
    var textbox = document.getElementsByClassName("canvasPart") as HTMLCollectionOf<HTMLElement>;
    var timeRem = document.getElementsByClassName("time-duration") as HTMLCollectionOf<HTMLElement>;
    if (this.varTxt == 0) {
      this.varTxt = 1
      this.checkState = 0
      textbox[0].style.transform = "translateX(0%)";
      switcherBtn[0].style.transform = " rotate(-90DEG)";
      switcherBtn[0].style.right = "5px";
      switcherBtn[0].style.top = "5px";
      timeRem[0].style.display = "none"
      // this.showHideOpts()
    }
    else {
      this.varTxt = 0;
      textbox[0].style.transform = "translateX(-105%)";
      switcherBtn[0].style.transform = " rotate(90DEG)";
      switcherBtn[0].style.right = "-50px";
      switcherBtn[0].style.top = "50%";
      timeRem[0].style.display = "block"


      this.checkState = 1;
      // this.showHideOpts()
    }
    console.log(this.varTxt);

  }
}
