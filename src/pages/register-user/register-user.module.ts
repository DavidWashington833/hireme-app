import { MaskTelPipe } from './../../pipes/mask-tel/mask-tel';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterUserPage } from './register-user';
import { MaskCpfPipe } from '../../pipes/mask-cpf/mask-cpf';

@NgModule({
  declarations: [
    MaskTelPipe,
    MaskCpfPipe,
    RegisterUserPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterUserPage),
  ],
  exports: [
    RegisterUserPage
  ]
})
export class RegisterUserPageModule {}
