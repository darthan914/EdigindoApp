import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendFeedbackEmailCrmPage } from './send-feedback-email-crm';

@NgModule({
  declarations: [
    SendFeedbackEmailCrmPage,
  ],
  imports: [
    IonicPageModule.forChild(SendFeedbackEmailCrmPage),
  ],
})
export class SendFeedbackEmailCrmPageModule {}
