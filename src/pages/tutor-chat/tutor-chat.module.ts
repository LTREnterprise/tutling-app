import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutorChatPage } from './tutor-chat';

@NgModule({
  declarations: [
    TutorChatPage,
  ],
  imports: [
    IonicPageModule.forChild(TutorChatPage),
  ],
})
export class TutorChatPageModule {}
