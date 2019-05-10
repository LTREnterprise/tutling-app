import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordingsPage } from './recordings';

@NgModule({
  declarations: [
    RecordingsPage,
  ],
  imports: [
    IonicPageModule.forChild(RecordingsPage),
  ],
})
export class RecordingsPageModule {}
