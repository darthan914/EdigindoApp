import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCrmDetailPage } from './list-crm-detail';

@NgModule({
  declarations: [
    ListCrmDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ListCrmDetailPage),
  ],
})
export class ListCrmDetailPageModule {}
