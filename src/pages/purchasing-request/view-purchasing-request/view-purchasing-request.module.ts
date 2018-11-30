import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewPurchasingRequestPage } from './view-purchasing-request';

@NgModule({
  declarations: [
    ViewPurchasingRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewPurchasingRequestPage),
  ],
})
export class PricePurchasingRequestPageModule {}
