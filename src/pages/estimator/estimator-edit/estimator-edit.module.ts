import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstimatorEditPage } from './estimator-edit';

@NgModule({
  declarations: [
    EstimatorEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EstimatorEditPage),
  ],
})
export class EstimatorEditPageModule {}
