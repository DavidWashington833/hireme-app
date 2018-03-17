import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecuperacaoDeSenhaPage } from './recuperacao-de-senha';

@NgModule({
  declarations: [
    RecuperacaoDeSenhaPage,
  ],
  imports: [
    IonicPageModule.forChild(RecuperacaoDeSenhaPage),
  ],
  exports: [
    RecuperacaoDeSenhaPage
  ]
})
export class RecuperacaoDeSenhaPageModule {}
