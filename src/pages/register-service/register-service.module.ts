import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { RegisterServicePage } from './register-service';

@NgModule({
  declarations: [
    RegisterServicePage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterServicePage),
  ],
})
export class RegisterServicePageModule {}
