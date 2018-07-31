import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryViewPage } from './delivery-view';

@NgModule({
  declarations: [
    DeliveryViewPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryViewPage),
  ],
})
export class DeliveryViewPageModule {}
