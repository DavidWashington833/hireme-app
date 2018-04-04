import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroPrestadorPage } from './cadastro-prestador';

@NgModule({
  declarations: [
    CadastroPrestadorPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroPrestadorPage),
  ]
})
export class CadastroPrestadorPageModule {}
