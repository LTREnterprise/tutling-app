import { Injectable, NgZone } from "@angular/core";
import { LoadingController, AlertController} from "ionic-angular";
import { dateDataSortValue } from "ionic-angular/umd/util/datetime-util";
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

declare var firebase;

@Injectable()
export class MethodsProvider {
  //variables
  webRTCClient:any;
  infoLabel = 0;
  resp = null;

  //arrays
  onlineTutors = new Array();
  appointmentsArr =  new Array();
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

  register(name,email,idnum,dbate,cell,eduLevel,hSkul, pSkul, university,psswrd){
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
                contact: cell,
                bdate : dbate,
                eduLevel : eduLevel,
                highSchool: hSkul,
                primary:pSkul,
                university:university,
                downloadurl: "assets/download.png",
              });
            resolve();
            setTimeout(() => {
              loading.dismiss();
            }, 1500);
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

  setRequest(){
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
          firebase.database().ref("users/" + user.uid).on("value", (data: any) => {
           let details = data.val();
           var x = 0;
            firebase.database().ref("requests/" + user.uid).set({
              name : details.name,
              id : x,
              img : details. downloadurl,
              contact : details.contact,
              status : false
          })            
         });
      })
    })
  }
  getOnlineUsers2(){
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.database().ref("requests/").on("value", (data: any) => {
          this.onlineTutors.length = 0;
          var state = false;
            if (data.val() != null){
              console.log('getting online tutors');
              var details = data.val();
              var key =  Object.keys(details);
              for (var i = 0; i < key.length; i++){
                var k = key[i];
                if (details[k].status == true)
                {
                  state = true
                }
                let onlineDetails ={
                  name :  details[k].name,
                  id : details[k].id,
                  img : details[k].img,
                  contact :details[k].contact,
                  status : details[k].status,
                  key : k
              }
              this.onlineTutors.push(onlineDetails)
            }
            if (state == true){
              this.navigateToClass();
            }
            resolve(this.onlineTutors)
          }
        })
      })
    })
  }
  getOnlineUsers(){
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
        firebase.database().ref("requests/" + user.uid).on("value", (data: any) => {
          this.onlineTutors.length = 0;
          var state = false;
            if (data.val() != null){
              console.log('getting online tutors');
              var details = data.val();
              var key =  Object.keys(details);
                if (details.status == true)
                {
                  state = true
                }
                let onlineDetails ={
                  name :  details.name,
                  id : details.id,
                  img : details.img,
                  contact :details.contact,
                  status : details.status,
                  key : user.uid
              }
              this.onlineTutors.push(onlineDetails)
            }
            if (state == true){
              this.navigateToClass();
            }
            resolve(this.onlineTutors)
          })
        })
    })
  }

  navigateToClass(){
    console.log('response available');
    this.resp = true;
  }

  getResp(){
    return this.resp;
  }

  approveLesson(i){
    return new Promise((accpt, rej) =>{
      firebase.database().ref("requests/" + i.key).update({status:true})
      accpt('')
    })
  }

  setUserId(id){
    return new Promise((accpt, rej) =>{
      var user = firebase.auth().currentUser;
      firebase.database().ref("requests/" + user.uid).update({id:id})
      accpt('')
    })
  }

  setAppontment(date,time,subject,course, channel){
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
        firebase.database().ref("appointments/" + user.uid).push({
          date : date,
          time : time,
          subject : subject,
          course : course,
          channel : channel
      })
      resolve(' ')
    })
  })
  }

getAppointments(){
  return new Promise((resolve, reject) => {
    let loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Please wait....",
    });
    loading.present();
    this.ngzone.run(() => {
      var user = firebase.auth().currentUser;
      firebase.database().ref("appointments/" + user.uid).on("value", (data: any) => {
        this.appointmentsArr.length = 0;
        if (data.val() != null){
          var details = data.val();
          var keys = Object.keys(details);
          for (var x = 0; x < keys.length; x++){
            var k = keys[x];
            let detailsObject = {
              date : details[k].date,
              time: details[k].time,
              subject : details[k].subject,
              course : details[k].course,
              channel : details[k].channel,
              key : k
            }
            this.appointmentsArr.push(detailsObject)
          }
          setTimeout(() => {
            loading.dismiss();
          }, 700);
          resolve(this.appointmentsArr)
        }else{
        reject('')
        }
    })
  })
})
}

removeAppointment(key){
  return new Promise((accpt, rej) =>{
    var user = firebase.auth().currentUser;
    firebase.database().ref("appointments/" + user.uid + "/" + key).remove()
    accpt('')
  })
}

updateAppointment(date,time, key){
  return new Promise((accpt, rej) =>{
    var user = firebase.auth().currentUser;
    firebase.database().ref("appointments/" + user.uid + "/" + key).update({
      date:date,
      time : time
    })
    accpt('')
  })
}

  getId(userid){
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.database().ref("requests/" + userid).on("value", (data: any) => {
          if (data.val() != null){
            var details = data.val();
            resolve(details.id);
          }else{
            resolve('0')
          }
      })
    })
  })
}

logout() {
  return new Promise((resolve, reject) => {
    this.ngzone.run(() => {
      firebase
        .auth()
        .signOut()
      resolve('');
    });
  });
}


signIn(email, pass){
  let loading = this.loadingCtrl.create({
    spinner: "bubbles",
    content: "Sign In....",
    duration: 4000000
  });
  loading.present();
  return new Promise((resolve, reject) => {
    this.ngzone.run(() => {
      firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
        resolve('');
        setTimeout(() => {
          loading.dismiss();
        }, 700);
      })  .catch(error => {
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
    });
  });
})
}

}


