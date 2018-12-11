import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RescheduleCrmPage } from './reschedule-crm';

@NgModule({
  declarations: [
    RescheduleCrmPage,
  ],
  imports: [
    IonicPageModule.forChild(RescheduleCrmPage),
  ],
})
export class RescheduleCrmPageModule {}
