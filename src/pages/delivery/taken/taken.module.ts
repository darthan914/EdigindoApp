import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryTakenPage } from './taken';

@NgModule({
  declarations: [
    DeliveryTakenPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryTakenPage),
  ],
})
export class DeliveryTakenPageModule {}
