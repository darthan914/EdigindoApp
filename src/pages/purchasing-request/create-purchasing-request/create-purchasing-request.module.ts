import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePurchasingRequestPage } from './create-purchasing-request';

@NgModule({
  declarations: [
    CreatePurchasingRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePurchasingRequestPage),
  ],
})
export class PurchasingRequestCreatePageModule {}
