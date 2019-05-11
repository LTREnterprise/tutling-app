import { Component, ViewChild, Renderer  } from '@angular/core';
import { Platform, Content } from 'ionic-angular';
import {LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { MethodsProvider } from '../../providers/methods/methods';
import { LocalNotifications } from '@ionic-native/local-notifications';
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
 * Generated class for the ClassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-class',
  templateUrl: 'class.html',
})
export class ClassPage {
  @ViewChild('imageCanvas') canvas: any;
  canvasElement: any;
 
  saveX: number;
  saveY: number;
 
  storedImages = [];
 
  // Make Canvas sticky at the top stuff
  @ViewChild(Content) content: Content;
  @ViewChild('fixedContainer') fixedContainer: any;
 
  // Color Stuff
  selectedColor = '#9e2956';
 
  colors = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3' ];
  distantNumber:any;
  webRTCClient:any;
  infoLabel:any;
  buttonLabel:any;
  buttonColor:any;
  state:any;
  loading;
  message;
  path;
  minutes = 0;
  minREf = 0;
  seconds = 0;
  secRef = 0;
  checkState = 0;
  varTxt = 0;
  constructor(private plt:Platform, private localNotifications: LocalNotifications,public loadingCtrl: LoadingController,public methods:MethodsProvider,public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public renderer: Renderer) {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Please wait",
    });
    // this.loading.present();
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
  ionViewDidEnter() {
    // https://github.com/ionic-team/ionic/issues/9071#issuecomment-362920591
    // Get the height of the fixed item
    let itemHeight = this.fixedContainer.nativeElement.offsetHeight;
    let scroll = this.content.getScrollElement();
 
    // Add preexisting scroll margin to fixed container size
    itemHeight = Number.parseFloat(scroll.style.marginTop.replace("px", "")) + itemHeight;
    scroll.style.marginTop = itemHeight + 'px';
  }
 
  ionViewDidLoad() {
    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    this.canvasElement.height = 500;
  }
 
  pushCall(event) {
    console.log("Push, callState="+this.state);
    if(this.distantNumber && this.state == STATE_WAIT) {
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
    // this.setID();
  }

  setID(){
    console.log(this.infoLabel);
    this.methods.setUserId(parseInt(this.infoLabel)).then((data:any) =>{
      console.log(data);
      this.setPath(data.path)
      this.methods.textAreaChat(data.path).then(() =>{
        console.log('second hellll');
        this.getText()
      })
    });
  }

  getText(){
    this.methods.getTextArea(this.path).then((chat:any) =>{
      this.message = "";
      this.message = chat;
      this.refreshMessages();
  })
  }

setPath(path){
  this.path = path;
}

refreshMessages(){
  setTimeout(() => {
    this.getText();
  }, 1200);
}

  refreshVideoView() {
    if (this.platform.is('ios')) {
      console.log("REFRESH");
      iosrtc.refreshVideos();
    }
  }
  typeMessage(event){
   this.methods.updateTextAreaChat(this.message,this.path);
  }

  timer(){
      setTimeout(() => {
        if (this.seconds == 0){
          if (this.minutes != 0){
          if (this.minutes  <= 9)
            this.minREf = 0;
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

  incomingCallHandler(e) {
    console.log("incomingCallHandler");
    this.state = STATE_INCALL;
    this.buttonColor = COLOR_HANGOUT;
    this.buttonLabel = LABEL_HANGOUT;
    this.loading.dismiss();
    this.timer();
    setTimeout(this.refreshVideoView,2000);
    setTimeout(() => {
      this.showHideOpts();
    }, 2000);
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
      { width: "30%", height: "20vh" },
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
testCanvas;
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
    var textbox = document.getElementsByClassName("callingPromt") as HTMLCollectionOf<HTMLElement>;
    var timeRem = document.getElementsByClassName("time-duration") as HTMLCollectionOf<HTMLElement>;
    if (this.varTxt == 0) {
      this.varTxt = 1
      this.checkState = 0
      textbox[0].style.transform = "translateX(0%)";
      switcherBtn[0].style.transform = " rotate(-90DEG)";
      switcherBtn[0].style.right = "5px";
      switcherBtn[0].style.top = "5px";
      timeRem[0].style.display = "none"
      this.showHideOpts()
    }
    else {
      this.varTxt = 0;
      textbox[0].style.transform = "translateX(-105%)";
      switcherBtn[0].style.transform = " rotate(90DEG)";
      switcherBtn[0].style.right = "-50px";
      switcherBtn[0].style.top = "50%";
      timeRem[0].style.display = "block"
      this.checkState = 1;
      this.showHideOpts()
      var canvas : any =  document.getElementById("equation") as HTMLCanvasElement;
      var ctx = canvas.toDataURL("image/jpeg");
      console.log(ctx);
      
     
    }
    console.log(this.varTxt);

  }


selectColor(color) {
  this.selectedColor = color;
}
 
startDrawing(ev) {
  var canvasPosition = this.canvasElement.getBoundingClientRect();
 
  this.saveX = ev.touches[0].pageX - canvasPosition.x;
  this.saveY = ev.touches[0].pageY - canvasPosition.y;
}
 
moved(ev) {
  var canvasPosition = this.canvasElement.getBoundingClientRect();
  let ctx = this.canvasElement.getContext('2d');
  let currentX = ev.touches[0].pageX - canvasPosition.x;
  let currentY = ev.touches[0].pageY - canvasPosition.y;
 
  ctx.lineJoin = 'round';
  ctx.strokeStyle = this.selectedColor;
  ctx.lineWidth = 5;
 
  ctx.beginPath();
  ctx.moveTo(this.saveX, this.saveY);
  ctx.lineTo(currentX, currentY);
  ctx.closePath();
 
  ctx.stroke();
 
  this.saveX = currentX;
  this.saveY = currentY;
}

saveCanvasImage() {
  var dataUrl = this.canvasElement.toDataURL();
 
  let ctx = this.canvasElement.getContext('2d');
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
 
  // let name = new Date().getTime() + '.png';
  console.log(dataUrl);
  
  // let path = this.file.dataDirectory;
  // let options: IWriteOptions = { replace: true };
 
  // var data = dataUrl.split(',')[1];
  // let blob = this.b64toBlob(data, 'image/png');
 
  // this.file.writeFile(path, name, blob, options).then(res => {
  //   this.storeImage(name);
  // }, err => {
  //   console.log('error: ', err);
  // });
}
 
// https://forum.ionicframework.com/t/save-base64-encoded-image-to-specific-filepath/96180/3
b64toBlob(b64Data, contentType) {
  contentType = contentType || '';
  var sliceSize = 512;
  var byteCharacters = atob(b64Data);
  var byteArrays = [];
 
  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
 
    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
 
    var byteArray = new Uint8Array(byteNumbers);
 
    byteArrays.push(byteArray);
  }
 
  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
}
