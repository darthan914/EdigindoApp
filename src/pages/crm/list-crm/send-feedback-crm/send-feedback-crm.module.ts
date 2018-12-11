import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendFeedbackCrmPage } from './send-feedback-crm';

@NgModule({
  declarations: [
    SendFeedbackCrmPage,
  ],
  imports: [
    IonicPageModule.forChild(SendFeedbackCrmPage),
  ],
})
export class SendFeedbackCrmPageModule {}
