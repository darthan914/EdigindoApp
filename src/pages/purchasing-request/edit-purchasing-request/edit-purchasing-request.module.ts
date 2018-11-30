import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPurchasingRequestPage } from './edit-purchasing-request';

@NgModule({
  declarations: [
    EditPurchasingRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPurchasingRequestPage),
  ],
})
export class EditPurchasingRequestPageModule {}
