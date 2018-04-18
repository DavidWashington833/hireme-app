import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrestadorCadastradoPage } from './prestador-cadastrado';

@NgModule({
  declarations: [
    PrestadorCadastradoPage,
  ],
  imports: [
    IonicPageModule.forChild(PrestadorCadastradoPage),
  ],
})
export class PrestadorCadastradoPageModule {}
