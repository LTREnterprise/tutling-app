import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavedAppointmentsPage } from './saved-appointments';

@NgModule({
  declarations: [
    SavedAppointmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(SavedAppointmentsPage),
  ],
})
export class SavedAppointmentsPageModule {}
