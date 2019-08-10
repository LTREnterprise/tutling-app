import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Page4Page } from '../page4/page4';
import { HomePage } from '../home/home';
import { MethodsProvider } from '../../providers/methods/methods';
import { ChattingPage } from '../chatting/chatting';

/**
 * Generated class for the RequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {
  private buttonColor: string = "light";
  private buttonColor2: string = "light";
  channel = null;
  date = null;
  time = null;
  minDate: string = new Date().toISOString();
  minTime : string = new Date().toLocaleTimeString(); 
  public items: any = [0,4,8];
  items2  = [4,8,12]
  modules = ["Accounting","Accounting  information Systems",
  "Actuarial Science",
 "Auditing",
 "Applied Physics",
 "Applied chemistry",
 "Applied mathematics", 
 "Applied statistics",
 "Archeology of death",
  "Anthropology of material culture",
  "Advanced real estate valuation",
  "Actuarial Statistics",
  "Architecture",
  "Advanced real estate market analysis",
  "Animal behaviour ",
  "Astrophysics",
   "Applied Physics",
  "Analystical Chemistry",
  "Animal form and function",
  "Analogue Electronics",
  "Archeology in action",
  "Archeology in the last 2000 years",
  "Approaches to cognitive archeology",
  "Architectural design and theory",
  "Auxilliary Physics",
  "Auxilliary Chemistry",
  "Archeology",
  "Acturial Mathematics",
  "Business Accounting",
  "Biotic diversity",
"Business Law",
"Business Ethics",
"Business studies",
"Business Statistics",
"Business Accounting",
"Biology",
"Bio Engineering",
"Building science",
"building technology",
"Computer science",
"Chemistry  major",
"Chemical enginerring research",
"Chemical engineering thermodynamics",
"Chemical engineering design",
"Chemical Engineering",
"Construction technology",
"Comparative planning systems",
"Commercial real estate investment",
"Computational mathematics" ,
"Corporate finance",
"Connstruction materials and environment",
"Consumer behavior",
"Complimentary Life Sciences",
"Computational and applied mathematics",
"Compensation and benefits",
"Contingencies",
"Development economics",
"Design",
"Drawing",
"Dynamics",
"Development of anthropology",
"Design representation",
"Development policy and process in SA",
"English",
"Econometrics",
"Engineering Physics",
"Engineering Mathematics",
"Engineering Chemistry",
"Earlier and middle stone age",
"Econometrics for property studies",
"Energy balances",
"Electromagnetism",
"Electronics and Circuits",
"Energy engineering",
"Ecology  ",
"Entrepreneurship and innovation ",
"Financial Accounting  ",
"Financial Reporting  ",
"Finance",
"Financial Management",
"Facilities management",
"Financial Enineering",
"Fundamentals of archeology",
"Fundamentals of ecology",
"Game Theory",
"Gender and writing",
"Geomatics",
"Geography",
"Geometry",
"General chemistry",
"Guide to human evolution",
"General physics",
"Genetics",
"Geology",
"Heat and fluids transfer",
"Human Biology",
"History and relationships of SA languages",
"Human Anatomy",
"History of archeological thought",
"Human resources",
"Introduction to Anthropology",
"Information Systems",
"Information technology",
"IT project management",
"Introductory statisticsv",
"introduction to extractive metallurgy",
"Insurance and risk management",
"Inoformatics",
"Introductory Life Sciences",
"Investment and corporate finance",
"Introduction to environmental planning",
"Introduction to land management",
"Internal Auditing",
"Identity and society",
"Isizulu",
"Kinetics",
"Labour Law",
"Literature of the black diaspora",
"Lithics",
"Micro economics",
"Macro Economics",
"Mathematical Statistics",
"Management Acccounting",
"Marketing",
"Mechanics",
"Management principles in construction",
"Mathematics - Linear algerbra",
"Material Science",
"Mathematics-Calculus" ,
"Mathematics - Linear algerbra",
"Microwave engineering",
"Mechatronics",
"Medical and applied entomology",
"Mechanical engineering",
"Molecular Biology",
"Mathematical tech for planners",
"Marine science  ",
"Mathematical Modeling",
"Micro Biology",
"Oral literature and Perfomance in SA",
"Organisational theory",
"Operations management",
"Programming-HTML",
"Programming-Java",
"Programming-Python",
"Programming-C++",
"Programming-Ruby",
"Programming-Java script",
"Programming -C#",
"Physics",
"Process engineering fundamentals",
"Phylosophy",
"Psychology",
"Principles of management",
"Principles of marketing",
"Project management ",
"Quantum physics",
"Quantum Mechanics",
"Quantitative methods for planners",
"Quantities and specifications",
"Reproduction Biology",
"Regional planning and local economics",
"Real estate valuation",
"Real estate finance",
"Real estate law",
"Real estate corporate finance",
"Strategic thinking",
"Select topics in Social anthropology",
"System design",
"Small office practice",
"Sustainability in environment",
"Statistics for engineers",
"Sounds and systems of African languages",
"Structure of words",
"Statistical modelling" ,
"Taxation",
"Thermofluids",
"Thermodynamics ",
"Theory and practice of construction",
"Two and three D CAD and GIS",
"Transport phenomena",
"Urban economics",
];
  lengthCourse = []
  cources = ["Information Technology", "HR", "Office Management"]
  searchItem;
  tempModules = new Array();
  tempCourses = new Array();
  constructor(public method: MethodsProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // this.intializeItems();

//  this.initializeModules();
  }

  initializeModules(){
    this.tempModules =  this.modules;
  }

  intializeItems(){
    // this.items = this.cources
    this.tempCourses = this.cources
  }

  itemSelected;
  courseSeleted = null;
  selectCP(item,i){
    this.searchItem
    this.courseSeleted = item;
    console.log(item);
    this.itemSelected = i;
// console.log(this.items[item]);

  }
  cancelSearch(event){
    console.log(event)
    this.courseSeleted = null;
    this.itemSelected = null;
  }
 currentCourse = "";
 courseSearched(item){
   console.log(item);
   this.searchItem =  item;
   this.currentCourse = item;
   this.tempCourses = [];
   this.selectCourse(event);
   
 }
 selectSubject(i,y){
  this.courseSeleted = i;
  this.tempModules = [];
  this.searchItem = i;
  for (var x = 0; x < this.modules.length; x++){
    if (i == this.modules[x]){
      this.itemSelected = x;
      break;
    }
}
  
 }
  selectCourse(ev){
    this.searchItem = "";
    var index = 0;
   for (var i = 0; i < this.cources.length; i++){
    if (this.currentCourse == this.cources[i]){
      index = i;
      break;
    }
   }
   console.log(index);
    this.filterCourses(index)
  }

  filterCourses(indx){
    this.tempModules = []
    for (var x = this.items[indx]; x < this.items2[indx]; x++){
      this.tempModules.push(this.modules[x])
    }
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
  home(){
    this.navCtrl.push(HomePage)
  }
  comType(type){
    if (type == "video"){
      if (this.buttonColor == "primary"){
        this.buttonColor = "light"
        this.buttonColor2 = "light"
        this.channel = null;
      }
      else{
        this.buttonColor = "primary"
        this.buttonColor2 = "light"
        this.channel = "video"
        // this.videoCall();
      }

    }
    else{
      if (this.buttonColor2 == "primary"){
        this.buttonColor = "light"
        this.buttonColor2 = "light"
        this.channel = null;
      }
      else{
        this.buttonColor2 = "primary"
        this.buttonColor = "light"
        this.channel = "texting"
      }
    }
  }

  requestTutor(){ 
   this.navCtrl.push(Page4Page, {channel:this.channel, sub:this.courseSeleted, course:this.currentCourse})
  }

  request(){
    console.log(this.date);
    console.log(this.time);
    
    if (this.courseSeleted != null){
    if (this.channel != null && this.date == null && this.time == null){
      const prompt = this.alertCtrl.create({
        message: "Are you sure you want to instantly request a tutor for " + this.courseSeleted,
        buttons: [
          {
            text: 'Disagree',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Agree',
            handler: data => {
            this.method.setRequest(this.channel, this.courseSeleted, this.currentCourse);
            if (this.channel == 'video')
              this. requestTutor();
              else if (this.channel == 'texting'){
              this.method.setRequest(this.channel,this.courseSeleted, this.currentCourse);
              this. requestTutor()}
            }
          }
        ]
      });
      prompt.present();
    }
    else if (this.channel ==  null){
      const prompt = this.alertCtrl.create({
        message: "Please select the communication you want between video and texting",
        buttons: [
          {
            text: 'Ok',
            handler: data => {
              console.log('Saved clicked');
            }
          }
        ]
      });
      prompt.present();
    }
    else if (this.date == null ||  this.date ==""){
      const prompt = this.alertCtrl.create({
        message: "Please select the date for the appointment",
        buttons: [
          {
            text: 'Ok',
            handler: data => {
              console.log('Saved clicked');
            }
          }
        ]
      });
      prompt.present();
    }
    else if (this.time ==  null ||  this.time == ""){
      const prompt = this.alertCtrl.create({
        message: "Please select the time for the appointment",
        buttons: [
          {
            text: 'Ok',
            handler: data => {
              console.log('Saved clicked');
            }
          }
        ]
      });
      prompt.present();
    }
    else if (this.channel != null && this.date != null && this.time != null){
      this.method.setAppontment(this.date,this.time, this.courseSeleted, this.currentCourse, this.channel).then(() =>{
        const prompt = this.alertCtrl.create({
          message: "Your Appointment has been scheduled",
          buttons: [
            {
              text: 'Ok',
              handler: data => {
                this.date = null;
                this.time = null;
                this.buttonColor = "light"
                this.buttonColor2 = "light xZ"
                console.log('Saved clicked');
              }
            }
          ]
        });
        prompt.present();
      })
    }
  }else{
    const prompt = this.alertCtrl.create({
      message: "Please select a Subject",
      buttons: [
        {
          text: 'Ok',
          handler: data => {
          }
        }
      ]
    });
    prompt.present();
  }
  }
}
