import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryWaitingPage } from './waiting';

@NgModule({
  declarations: [
    DeliveryWaitingPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryWaitingPage),
  ],
})
export class DeliveryWaitingPageModule {}
