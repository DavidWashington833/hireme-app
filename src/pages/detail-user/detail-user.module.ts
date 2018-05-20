import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailUserPage } from './detail-user';
import { MaskCpfPipe } from '../../pipes/mask-cpf/mask-cpf';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    DetailUserPage,
  ],
  imports: [
    PipesModule,
    // MaskCpfPipe,
    IonicPageModule.forChild(DetailUserPage),
  ],
})
export class DetailUserPageModule {}
