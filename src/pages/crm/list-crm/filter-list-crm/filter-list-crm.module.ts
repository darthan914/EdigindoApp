import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterListCrmPage } from './filter-list-crm';

@NgModule({
  declarations: [
    FilterListCrmPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterListCrmPage),
  ],
})
export class FilterListCrmPageModule {}
