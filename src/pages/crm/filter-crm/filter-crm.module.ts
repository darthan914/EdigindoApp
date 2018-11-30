import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterCrmPage } from './filter-crm';

@NgModule({
  declarations: [
    FilterCrmPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterCrmPage),
  ],
})
export class FilterCrmPageModule {}
