import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryWaitingPage } from './delivery-waiting';

@NgModule({
  declarations: [
    DeliveryWaitingPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryWaitingPage),
  ],
})
export class DeliveryWaitingPageModule {}
