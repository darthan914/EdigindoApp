import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCrmPage } from './list-crm';

@NgModule({
  declarations: [
    ListCrmPage,
  ],
  imports: [
    IonicPageModule.forChild(ListCrmPage),
  ],
})
export class ListCrmPageModule {}
