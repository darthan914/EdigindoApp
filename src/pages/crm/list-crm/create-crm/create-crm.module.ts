import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCrmPage } from './create-crm';

@NgModule({
  declarations: [
    CreateCrmPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCrmPage),
  ],
})
export class CreateCrmPageModule {}
