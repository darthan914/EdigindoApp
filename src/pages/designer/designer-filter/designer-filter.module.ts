import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DesignerFilterPage } from './designer-filter';

@NgModule({
  declarations: [
    DesignerFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(DesignerFilterPage),
  ],
})
export class DesignerFilterPageModule {}
