import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ActionSheetController} from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the SqlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqlProvider {

  private db: SQLiteObject;
  private isOpen: boolean;

  constructor(
    public storage: SQLite,
    private ac: ActionSheetController,
    public toastCtrl: ToastController
  ){
    if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage.create({ name: "tutling.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS convo (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, convo TEXT, sub TEXT, time TEXT, key TEXT) ", []);
        db.executeSql("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT, date TEXT, userId TEXT, image TEXT, convo TEXT) ", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  getAllConvo(){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("SELECT * FROM convo", []).then((data) => {
        let arrayUsers = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayUsers.push({
              id: data.rows.item(i).id,
              date: data.rows.item(i).date,
              sub: data.rows.item(i).sub,
              convo: data.rows.item(i).convo,
              time: data.rows.item(i).time,
              key: data.rows.item(i).key,
            });       
          }          
        }   
        resolve(arrayUsers);
      }, (error) => {
        reject(error);
      })
    })
  }
  initializeConvo(date, convo, sub, time, key){
    return new Promise ((resolve, reject) => {
      let sql = "INSERT INTO convo (date, convo, sub, time, key) VALUES (?, ?, ?, ?, ?)";
      this.db.executeSql(sql, [date, convo, sub, time, key]).then((data) =>{
        resolve(data);
        const toast = this.toastCtrl.create({
          message: 'convo initialized',
          duration: 3000
        });
        // toast.present();
      }, (error) => {
        reject(error);
      });
    });
  }


  storefavourite( message:string, date:string, userId:string, image:string, convo:string){
    return new Promise ((resolve, reject) => {
      let sql = "INSERT INTO messages (message, date, userId, image, convo) VALUES (?, ?, ?, ?, ?)";
      this.db.executeSql(sql, [message, date, userId, image, convo]).then((data) =>{
        resolve(data);
        const toast = this.toastCtrl.create({
          message: 'Message added ',
          duration: 1000
        });
        // toast.present();
      }, (error) => {
        reject(error);
      });
    });
  }

  GetAllFavourite(conv){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("SELECT * FROM messages WHERE convo = ?", [conv]).then((data) => {
        let arrayUsers = [];
        if (data.rows.length > 0) {
          for (var i = 1; i < data.rows.length; i++) {
            arrayUsers.push({
              id: data.rows.item(i).id,
              message: data.rows.item(i).message,
              date: data.rows.item(i).date,
              senderID: data.rows.item(i).userId,
              image: data.rows.item(i).image,
              convo: data.rows.item(i).convo,
            });       
          }          
        }   
        resolve(arrayUsers);
      }, (error) => {
        reject(error);
      })
    })
  }


  getColourState(url){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("SELECT * FROM favourites WHERE url = ?", [url]).then((data) => {
        let arrayUsers = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayUsers.push({
              colour: data.rows.item(i).colour,
            });       
          }          
        }   
        resolve(arrayUsers);
      }, (error) => {
        reject(error);
      })
    })
  }

  deleteFavourite(url){
    return new Promise ((resolve, reject) => {
      let sql = "DELETE FROM favourites WHERE url IN (?)";
      this.db.executeSql(sql,[url]).then((data) =>{
        resolve(data);
        const toast = this.toastCtrl.create({
          message: 'Story Removed from Favourites',
          duration: 1000
        });
        toast.present();
      }, (error) => {
        reject(error);
      });
    });
  }


}
