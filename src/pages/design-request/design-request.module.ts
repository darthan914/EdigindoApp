import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DesignRequestPage } from './design-request';

@NgModule({
  declarations: [
    DesignRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(DesignRequestPage),
  ],
})
export class DesignRequestPageModule {}
