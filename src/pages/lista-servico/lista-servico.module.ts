import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaServicoPage } from './lista-servico';

@NgModule({
  declarations: [
    ListaServicoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaServicoPage),
  ],
})
export class ListaServicoPageModule {}
