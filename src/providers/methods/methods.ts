import { Injectable, NgZone } from "@angular/core";
import { LoadingController, AlertController} from "ionic-angular";
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

declare var firebase;

@Injectable()
export class MethodsProvider {
  //variables
  webRTCClient:any;
  infoLabel = 0;

  //arrays
  onlineTutors = new Array();
  constructor(private ngzone: NgZone,public loadingCtrl: LoadingController,  public alertCtrl: AlertController,) {
  }

  checkstate() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var state;
        firebase.auth().onAuthStateChanged(user => {
          if (user != null) {
          state = 1;
          } else {
            state = 0;
          }
          resolve(state);
        });
      });
    });
  }

  register(name, psswrd, email){
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        let loading = this.loadingCtrl.create({
          spinner: "bubbles",
          content: "Signing in....",
        });
        loading.present();
        return firebase
          .auth()
          .createUserWithEmailAndPassword(email, psswrd)
          .then(newUser => {
            var user = firebase.auth().currentUser;
            firebase
              .database()
              .ref("users/" + user.uid)
              .set({
                name: name,
                email: email,
                contact: "",
                downloadurl: "../../assets/download.png",
              });
            resolve();
            loading.dismiss();
          })
          .catch(error => {
            loading.dismiss();
            const alert = this.alertCtrl.create({
              subTitle: error.message,
              buttons: [
                {
                  text: "OK",
                  handler: data => {
                    console.log("Cancel clicked");
                  }
                }
              ]
            });
            alert.present();
            console.log(error);
          });
      });
    });
  }

  setUserOnline(){
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
          firebase.database().ref("users/" + user.uid).on("value", (data: any) => {
           let details = data.val();
            firebase.database().ref("online/" + user.uid).set({
              name : details.name,
              id : this.infoLabel,
              img : details. downloadurl,
              contact : details.contact
          })            
         });
      })
    })
  }

  getOnlineUsers(){
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.database().ref("online/").on("value", (data: any) => {
          this.onlineTutors.length = 0;
            if (data.val() != null){
              var details = data.val();
              var key =  Object.keys(details);
              for (var i = 0; i < key.length; i++){
                var k = key[i];
                let onlineDetails ={
                  name :  details[k].name,
                  id : details[k].id,
                  img : details[k].img,
                  contact :details[k].contact
              }
              this.onlineTutors.push(onlineDetails)
            }
            resolve(this.onlineTutors)
          }
        })
      })
    })
  }

}


