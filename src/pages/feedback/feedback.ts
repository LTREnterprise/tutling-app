import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MethodsProvider } from '../../providers/methods/methods';
import { ClassPage } from '../class/class';
import { AppointmentsPage } from '../appointments/appointments';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  tutors = this.navParams.get('tutors')
  constructor(public methods: MethodsProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.tutors);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }
  accept(i){
    this.methods.approveLesson(i).then(() =>{
      this.navCtrl.push(AppointmentsPage, {user:i})
    })
  }
  decline(i){
    console.log(i);
  }
}
