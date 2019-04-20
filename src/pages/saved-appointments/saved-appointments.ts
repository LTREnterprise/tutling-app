import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { MethodsProvider } from '../../providers/methods/methods';

/**
 * Generated class for the SavedAppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saved-appointments',
  templateUrl: 'saved-appointments.html',
})
export class SavedAppointmentsPage {
  appoinmentsArray =  new Array();
  constructor(public methods: MethodsProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController) {
    this.methods.getAppointments().then((data:any) =>{
      this.appoinmentsArray = data;
      console.log(this.appoinmentsArray);
    }, Error =>{
      const prompt = this.alertCtrl.create({
        message: "You do not have any Appointments scheduled",
        buttons: [
          {
            text: 'Ok',
            handler: data => {
              this.navCtrl.pop()
              console.log('Saved clicked');
            }
          }
        ]
      });
      prompt.present();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavedAppointmentsPage');
  }
  cancel(key){
    const confirm = this.alertCtrl.create({
      message: 'Are you sure you want to cancel this appointment?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.methods.removeAppointment(key);
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
  edit(i){
    const prompt = this.alertCtrl.create({
      message: "Please note that, the information shown below is the date and time for your appointment",
      inputs: [
        {
          name: 'Date',
          placeholder: i.date,
          type: 'Date'
        },
        {
          name: 'Time',
          placeholder: i.time,
          type: 'Time'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            var date;
            var time;
            if (data.Date == "" &&  data.Time == ""){
              date = i.date
              time = i.time
            }
            else if (data.Time != "" && data.Date == ""){
              time = data.Time;
              date = i.date
            }
            else if (data.Time == "" && data.Date != ""){
              time = i.time
              date = data.Date;
            }
            else {
              time = data.Time;
              date = data.Date;
            }
          this.methods.updateAppointment(date, time,i.key);
          }
        }
      ]
    });
    prompt.present();
  }
}
