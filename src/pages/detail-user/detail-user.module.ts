import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailUserPage } from './detail-user';
import { MaskCpfPipe } from '../../pipes/mask-cpf/mask-cpf';

@NgModule({
  declarations: [
    MaskCpfPipe,
    DetailUserPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailUserPage),
  ],
})
export class DetailUserPageModule {}
