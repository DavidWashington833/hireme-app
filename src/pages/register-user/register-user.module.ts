import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterUserPage } from './register-user';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    RegisterUserPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(RegisterUserPage),
  ],
  exports: [
    RegisterUserPage
  ]
})
export class RegisterUserPageModule {}
