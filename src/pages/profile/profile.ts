import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MethodsProvider } from '../../providers/methods/methods';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
profile = new Array();
name;
contacts;
email;
bdate;

  constructor(public alertCtrl:AlertController,  public navCtrl: NavController, public navParams: NavParams , public methods:MethodsProvider) {
  }
  home(){
    this.navCtrl.pop();
  }

  addQ(){
    const prompt = this.alertCtrl.create({
      title: 'Degree',
      message: "Enter a name for your Degree",
      inputs: [
        {
          name: 'title',
          placeholder: 'Degree'
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
            console.log(data.title);
            this.methods.saveQualifications(data.title);
          }
        }
      ]
    });
    prompt.present();
  }
  delete(x){
    const confirm = this.alertCtrl.create({
      message: 'Do you wish to remove this degree?',
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
            this.methods.removeQualification(this.profile[x].key);
            this.profile.splice(x,1);
          }
        }
      ]
    });
    confirm.present();
  }
  ionViewDidLoad() {
    this.methods.getQualifications().then((data:any) =>{
      this.profile = [];
      this.profile = data;
      console.log(this.profile)
    })
    this.methods.getProfile().then((data:any) =>{
    this.name = data.name
    this.downloadurl = data.downloadurl;
    this.email = data.email;
    this.bdate = data.bdate;
    this.contacts = data.contact;
    })
  }
  downloadurl;
  insertpic(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
        reader.onload = (event: any) => {
          this.downloadurl = event.target.result;
          this.methods.updateProfile(this.downloadurl);
        }
        reader.readAsDataURL(event.target.files[0]);
      }

    }

}
