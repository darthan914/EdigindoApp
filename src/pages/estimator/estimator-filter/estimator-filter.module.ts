import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstimatorFilterPage } from './estimator-filter';

@NgModule({
  declarations: [
    EstimatorFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(EstimatorFilterPage),
  ],
})
export class EstimatorFilterPageModule {}
