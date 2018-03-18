import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheDoPrestadorPage } from './detalhe-do-prestador';

@NgModule({
  declarations: [
    DetalheDoPrestadorPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheDoPrestadorPage),
  ],
})
export class PrestadorPageModule {}
