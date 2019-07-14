import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutorRegisterPage } from './tutor-register';

@NgModule({
  declarations: [
    TutorRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(TutorRegisterPage),
  ],
})
export class TutorRegisterPageModule {}
