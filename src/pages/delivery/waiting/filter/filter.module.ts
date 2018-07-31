import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryWaitingFilterPage } from './filter';

@NgModule({
  declarations: [
    DeliveryWaitingFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryWaitingFilterPage),
  ],
})
export class DeliveryWaitingFilterPageModule {}
