import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheDoUsuarioPage } from './detalhe-do-usuario';

@NgModule({
  declarations: [
    DetalheDoUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheDoUsuarioPage),
  ],
})
export class DetalheDoUsuarioPageModule {}
