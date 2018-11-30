import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchasingRequestPage } from './purchasing-request';

@NgModule({
  declarations: [
    PurchasingRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchasingRequestPage),
  ],
})
export class PurchasingRequestPageModule {}
