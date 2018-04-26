import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisteredProviderPage } from './registered-provider';

@NgModule({
  declarations: [
    RegisteredProviderPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisteredProviderPage),
  ],
})
export class RegisteredProviderPageModule {}
