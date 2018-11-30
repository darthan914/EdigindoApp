import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingDeliveryPage } from './waiting-delivery';

@NgModule({
  declarations: [
    WaitingDeliveryPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingDeliveryPage),
  ],
})
export class WaitingDeliveryPageModule {}
