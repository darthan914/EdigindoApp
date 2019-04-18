import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DesignerEditPage } from './designer-edit';

@NgModule({
  declarations: [
    DesignerEditPage,
  ],
  imports: [
    IonicPageModule.forChild(DesignerEditPage),
  ],
})
export class DesignerEditPageModule {}
