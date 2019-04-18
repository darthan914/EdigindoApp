import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DesignerCreatePage } from './designer-create';

@NgModule({
  declarations: [
    DesignerCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(DesignerCreatePage),
  ],
})
export class DesignerCreatePageModule {}
