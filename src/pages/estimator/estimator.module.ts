import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstimatorPage } from './estimator';

@NgModule({
  declarations: [
    EstimatorPage,
  ],
  imports: [
    IonicPageModule.forChild(EstimatorPage),
  ],
})
export class EstimatorPageModule {}
