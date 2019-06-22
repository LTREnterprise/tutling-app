import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatsRecordingsPage } from './chats-recordings';

@NgModule({
  declarations: [
    ChatsRecordingsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatsRecordingsPage),
  ],
})
export class ChatsRecordingsPageModule {}
