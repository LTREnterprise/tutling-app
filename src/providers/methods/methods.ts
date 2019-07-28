import { Injectable, NgZone } from "@angular/core";
import { LoadingController, AlertController, UrlSerializer} from "ionic-angular";
import { dateDataSortValue } from "ionic-angular/umd/util/datetime-util";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { SqlProvider } from "../sql/sql";
import moment from "moment";
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
  textArea =  new Array();
  messages = new Array();
  constructor(public sql:SqlProvider, private ngzone: NgZone,public loadingCtrl: LoadingController,  public alertCtrl: AlertController,) {
   
    
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
          content: "Please wait....",
        });
        loading.present();
        return firebase
          .auth()
          .createUserWithEmailAndPassword(email, psswrd)
          .then(newUser => {
            var user = firebase.auth().currentUser;
            user.sendEmailVerification();
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
              loading.dismiss();
              this.checkVerificatiom();
            resolve('');
              
             
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


  signIn(email, pass){
    let loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Signing In....",
      duration: 4000000
    });
    loading.present();
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
          var user = firebase.auth().currentUser;
          if (user.emailVerified == true) {
            this.checkUserType().then((data:any) =>{
              resolve(data);
            })
           
          }
          else{
            this.checkVerificatiom();
            this.logout();
            reject('')
          }
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
  


  checkVerificatiom() {
    var user = firebase.auth().currentUser;
    if (user.emailVerified == false) {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: "We have sent you a verification Email, Please activate your account with the link in the mail",
        buttons: ['OK']
      });
      alert.present();
      this.logout();
      return 0;
    }
    else {
      return 1;
    }
  }


 
  updateProfile(pic){
    return new Promise((accpt, rej) =>{
      var user = firebase.auth().currentUser;
      firebase.database().ref("users/" + user.uid).update({downloadurl:pic})
      accpt('')
    })
  }

  removeQualification(key){
    return new Promise((accpt, rej) =>{
      var user = firebase.auth().currentUser;
      firebase.database().ref("degree/" + user.uid + "/" + key).remove()
      accpt('')
    })
  }

saveQualifications(degree){
  return new Promise((resolve, reject) => {
    this.ngzone.run(() => {
      var user = firebase.auth().currentUser;
      firebase
      .database()
      .ref("degree/" + user.uid)
      .push({
        degree:degree
      });
      resolve('')
    })
  })
}  
degree = new Array();
getQualifications(){
  return new Promise((resolve, reject) => {
    this.ngzone.run(() => {
      var user = firebase.auth().currentUser;
        firebase.database().ref("degree/" + user.uid).on("value", (data: any) => {
          this.degree = []
          if (data.val() != undefined){
            let details = data.val();
            var keys = Object.keys(details);
            for (var x = 0; x < keys.length; x++){
              var k = keys[x];
              let obj = {
                degree :details[k].degree,
                key : k
              }
              this.degree.push(obj)
            }
            resolve(this.degree)
          }
        })
    })
  })
}
  getProfile(){
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
          firebase.database().ref("users/" + user.uid).on("value", (data: any) => {
           let details = data.val();
           resolve(details)
          })
      })
    })
  }

  setRequest(type, sub, course){
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
          firebase.database().ref("users/" + user.uid).on("value", (data: any) => {
           let details = data.val();
           var x = 0;
            firebase.database().ref("requests/" + user.uid).set({
              name : details.name,
              id : x,
              sub: sub,
              course: course,
              img : details. downloadurl,
              contact : details.contact,
              tutorId: "0000sfsdfsdf",
              path : "",
              channel : type,
              status : false
          })            
         });
      })
    })
  }

  storePosition(position, path){
    var user = firebase.auth().currentUser;
    firebase.database().ref("position/" + path).push({
      position :position
    })
  }

  getPosition(path){
    return new Promise((resolve, reject) => {
      var user = firebase.auth().currentUser;
      firebase.database().ref("position/" + path).on("value", (data: any) => {
        resolve(data.val())
      })
    })
  }

  // registerTutor(name,email,dDate,idNum,cellNum,university,highSchool,primary,eduLevel,pass){

  // }

  registerTutor(name,email,idnum,dbate,cell,eduLevel,hSkul, pSkul, university,psswrd){
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        let loading = this.loadingCtrl.create({
          spinner: "bubbles",
          content: "Loading....",
        });
        loading.present();
        return firebase
          .auth()
          .createUserWithEmailAndPassword(email, psswrd)
          .then(newUser => {
            var user = firebase.auth().currentUser;
            user.sendEmailVerification();
            firebase
              .database()
              .ref("users/" + user.uid)
              .set({
                name: name,
                email: email,
                status: 'pending',
                contact: cell,
                bdate : dbate,
                idnum : idnum,
                eduLevel : eduLevel,
                highSchool: hSkul,
                primary:pSkul,
                university:university,
                downloadurl: "assets/download.png",
                role : 'tutor'
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

  saveApplication(id,trans,sub){
    return new Promise((accpt, rej) =>{
      var user = firebase.auth().currentUser;
      var date = new Date();
      var timestamp = date.getTime();
      firebase.database().ref("Applications/" + user.uid).set({
        Date: moment().format('l'),
        convo : timestamp,
        id : id,
        trans: trans,
        sub:sub
    })
    this.checkVerificatiom();
   accpt('')
})
  }


  getOnlineUsers(){
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.database().ref("requests/").on("value", (data: any) => {
          this.onlineTutors.length = 0;
          var state = false;
          var user = firebase.auth().currentUser;
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
                  key : k,
                  path : details[k].path,
                  user : user.uid,
                  channel: details[k].channel
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
  getOnlineUsers2(){
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
                  tutorId: " ",
                  key : user.uid,
                  path : details.path,
                  channel: details.channel
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

  setPath(path, sub, key){
        return new Promise((accpt, rej) =>{
          var date = new Date();
          var timestamp = date.getTime();
          firebase.database().ref("Chats/" + path).push({
            message: "",
            Date: moment().format('l'),
            senderID: "",
            receiverID : "",
            convo : timestamp
        })
       accpt('')
    })
  }
  messagesCounter = 0;
  getMessages2(path){
    return new Promise((accpt, rej) =>{
      firebase.database().ref("Chats/" + path).on("value", (data: any) => {
        this.messages.length = 0;
        if (data.val() != null || data.val() != undefined){
          var msges = data.val();
          var key = Object.keys(msges);
          if (this.messagesCounter >= 1)
          this.messagesCounter = 1;
          console.log('getting messagessasasas');
          
          for (var x = this.messagesCounter; x < key.length; x++){
            var k = key[x];
            let msObject = {
              message : msges[k].message,
              Date: msges[k].Date,
              senderID: msges[k].senderID,
              receiverID : msges[k].receiverID,
              convo : msges[k].convo
            } 
            this.messages.push(msObject) 
          }
          this.messagesCounter++;
          accpt(this.messages)
        }
      })
    })
  }

  getMessages(path){
    return new Promise((accpt, rej) =>{
      firebase.database().ref("Chats/" + path).on("value", (data: any) => {
        this.messages.length = 0;
        if (data.val() != null || data.val() != undefined){
          var msges = data.val();
          var key = Object.keys(msges);
          if (this.messagesCounter >= 1)
          this.messagesCounter = 1;
          console.log('getting messagessasasas');
          
          for (var x = this.messagesCounter; x < key.length; x++){
            var k = key[x];
            let msObject = {
              message : msges[k].message,
              Date: msges[k].Date,
              senderID: msges[k].senderID,
              receiverID : msges[k].receiverID,
              convo : msges[k].convo
            } 
            this.messages.push(msObject) 
          }
          this.messagesCounter++;
        var length =  this.messages.length;
        console.log(this.messages[length - 1].message);
        this.sql.storefavourite(this.messages[length - 1].message,this.messages[length - 1].Date,this.messages[length - 1].senderID,"",this.messages[length - 1].convo)
          accpt(this.messages)
        }
      })
    })
  }

  sendMessage(path, text, convo){
    return new Promise((accpt, rej) =>{
      var user = firebase.auth().currentUser;
      firebase.database().ref("Chats/" + path).push({
        message: text,
        Date: moment().format('l'),
        senderID: user.uid,
        receiverID : "",
        convo: convo
    })
   accpt('')
})
  }

  navigateToClass(){
    console.log('response available');
    this.resp = true;
  }

  getResp(){
    return this.resp;
  }

  getUserID(){
    return firebase.auth().currentUser.uid
  }

  approveLesson(i){
    return new Promise((accpt, rej) =>{
      var user = firebase.auth().currentUser;
      var chatPath = i.key + "/" + user.uid; 
      firebase.database().ref("requests/" + i.key).update({status:true, tutorId:user.uid,   path : chatPath,})
      accpt(chatPath)
    })
  }

  setUserId(id){
    return new Promise((accpt, rej) =>{
      var user = firebase.auth().currentUser;
      firebase.database().ref("requests/" + user.uid).update({id:id})
      firebase.database().ref("requests/"  + user.uid).on("value", (data: any) => {
        let respObject = {
          id : data.val().tutorId,
          path : data.val().path
        }
        accpt(respObject)
      })
    })
  }

  textAreaChat(path){
    return new Promise((accpt, rej) =>{
      firebase.database().ref("textAreaChat/" + path).set({
        text: " "
      })
      accpt('');
    })
  }

  getTextArea(path){
    return new Promise((accpt, rej) =>{
    firebase.database().ref("textAreaChat/" + path).on("value", (data: any) => {
        this.textArea = [];
        console.log("helllllllllllllllllllllllllllll");
        this.textArea = data.val().text;
        accpt(this.textArea)
      })
    })
  }

  updateTextAreaChat(newTExt, path){
    return new Promise((accpt, rej) =>{
        var user = firebase.auth().currentUser;
        firebase.database().ref("textAreaChat/" + path).update({text:newTExt})
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
        loading.dismiss();
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

userType;

setUserType(x){
  this.userType = x;
}

getUserType(){
  return this.userType
}

checkUserType(){
  return new Promise((resolve, reject) => {
    this.ngzone.run(() => {
      var user = firebase.auth().currentUser;
      firebase.database().ref("users/" + user.uid).on("value", (data: any) => {
        var details  =  data.val();
        console.log(details)
        if (details.role == 'tutor'){
          this.setUserType(1)
          resolve(1);
        }
        else{
          this.setUserType(0)
          resolve(0)
        }
        
    })
  })
})

}



}


