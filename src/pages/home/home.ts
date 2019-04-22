import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { MethodsProvider } from '../../providers/methods/methods';
import { SavedAppointmentsPage } from '../saved-appointments/saved-appointments';
declare var iosrtc;
declare var apiRTC;
declare var apiCC;

const STATE_WAIT = "wait";
const STATE_INCALL = "incall";

const LABEL_CALL = "Call";
const LABEL_HANGOUT = "Hangup";

const COLOR_CALL = "#5cb85c";
const COLOR_HANGOUT = "#d9534f";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  distantNumber:any;
  webRTCClient:any;
  infoLabel:any;
  buttonLabel:any;
  buttonColor:any;
  state:any;

  constructor(public methods:MethodsProvider, public navCtrl: NavController, public alertCtrl: AlertController, public platform: Platform) {
  
  }

 



  Payment(){
   
  }

  Recordings(){

  }

  Appointments(){
    this.navCtrl.push(SavedAppointmentsPage)
  }
  
  Profile(){

  }
}
