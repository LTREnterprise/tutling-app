import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MethodsProvider } from '../../providers/methods/methods';
import { FeedbackPage } from '../feedback/feedback';
import { SignInPage } from '../sign-in/sign-in';

/**
 * Generated class for the Tutorregister2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tutorregister2',
  templateUrl: 'tutorregister2.html',
})
export class Tutorregister2Page {
  modules = ["DSO24T","CGS17AT", "CMK17BT", "TPG117", 
  "Accounting", "Computer", "TLPD", "Business",
  "Computer", "Manangement", "Office"];
  lengthCourse = []
  cources = new Array();
  searchItem;
  tempModules = new Array();
  tempCourses = new Array();
  itemSelected;
  courseSeleted;
  sub;
  constructor(public methods:MethodsProvider, public alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tutorregister2Page');
  }
  selectCP(item,i){
    this.sub = item;
    console.log(this.sub);
    this.itemSelected = i;
    this.courseSeleted = item;
    this.addsubject();
  }
  getItems(ev){
    
    this.initializeModules()
     var val = this.searchItem
      if (val && val.trim() != '') {
        this.tempModules = this.tempModules.filter((item) => {
          console.log(val);
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      else if (val == "" || val == null) {
        this.tempModules = [];
        this.searchItem = "";
      }
    }
    initializeModules(){
      this.tempModules =  this.modules;
    }

    selectSubject(i,y){
      this.courseSeleted = i;
      this.tempModules = [];
      this.searchItem = i;
      this.sub = i;
      this.addsubject();
      for (var x = 0; x < this.modules.length; x++){
        if (i == this.modules[x]){
          this.itemSelected = x;
          break;
        }
    }
}

remove(x){
  const confirm = this.alertCtrl.create({
    message: 'Do you want to remove ' + this.cources[x].name + ' from your list?',
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
         this.cources.splice(x,1);
        }
      }
    ]
  });
  confirm.present();
}

addsubject(){
  if (this.cources.length == 3){
      const alert = this.alertCtrl.create({
        subTitle: 'Please note that you are only allowed to tutor a maximum of 3 subjects',
        buttons: ['OK']
      });
      alert.present();
  }
  else{

    var state = 0;

    for (var x = 0; x < this.cources.length; x++){
      if (this.courseSeleted == this.cources[x].name){
        state = 1;
        break;
      }
    }
    if (state == 0){
      const prompt = this.alertCtrl.create({
        message: "Please enter the latest mark for " + this.sub,
        inputs: [
          {
            name: 'title',
            type: 'number',
            placeholder: 'Latest mark for ' + this.courseSeleted
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
              this.cancelSearch(event);
            }
          },
          {
            text: 'Add',
            handler: data => { 
              let obj = {
                name : this.courseSeleted,
                mark: data.title
              } 
            this.cources.push(obj);
            this.cancelSearch(event);
            }
          }
        ]
      });
      prompt.present();
    }
    else{
      const alert = this.alertCtrl.create({
        subTitle: 'Please note that you cannot select a subject more than once',
        buttons: ['OK']
      });
      this.cancelSearch(event)
      alert.present();
     
    }
  
  }
 

}
ID = null;
transcript = null;
trans(event: any) {
  if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
      reader.onload = (event: any) => {
        this.transcript = event.target.result;
        // console.log(this.transcript)
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  id(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
        reader.onload = (event: any) => {
          this.ID  = event.target.result;
          // console.log(this.ID)
        }
        reader.readAsDataURL(event.target.files[0]);
      }
    }

cancelSearch(event){
  console.log(event)
  this.courseSeleted = null;
  this.itemSelected = null;
  this.searchItem = "";
  }

  submit(){
    if (this.ID == null){
      const alert = this.alertCtrl.create({
        subTitle: 'Please upload a copy of your ID',
        buttons: ['OK']
      });
      this.cancelSearch(event)
      alert.present();
    }
    else if (this.transcript  == null){
      const alert = this.alertCtrl.create({
        subTitle: 'Please upload a copy of your Transcript',
        buttons: ['OK']
      });
      this.cancelSearch(event)
      alert.present();
    }
    else if (this.cources.length == 0){
      const alert = this.alertCtrl.create({
        subTitle: 'Please select a minimun of one subject that you want to tutor',
        buttons: ['OK']
      });
      this.cancelSearch(event)
      alert.present();
    }
    else{
        this.methods.saveApplication(this.ID,this.transcript,this.cources).then(() =>{
          this.navCtrl.setRoot(SignInPage)
        })
    }
  }
}
