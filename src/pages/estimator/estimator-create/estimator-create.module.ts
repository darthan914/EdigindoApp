import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstimatorCreatePage } from './estimator-create';

@NgModule({
  declarations: [
    EstimatorCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(EstimatorCreatePage),
  ],
})
export class EstimatorCreatePageModule {}
