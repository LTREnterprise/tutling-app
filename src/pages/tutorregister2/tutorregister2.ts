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
