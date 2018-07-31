import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryTakenFilterPage } from './filter-delivery-taken';

@NgModule({
  declarations: [
    DeliveryTakenFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryTakenFilterPage),
  ],
})
export class DeliveryTakenFilterPageModule {}
