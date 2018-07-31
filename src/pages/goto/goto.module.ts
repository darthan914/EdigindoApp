import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GotoPage } from './goto';

@NgModule({
  declarations: [
    GotoPage,
  ],
  imports: [
    IonicPageModule.forChild(GotoPage),
  ],
})
export class GotoPageModule {}
