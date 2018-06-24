import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProvidersModule } from '../providers/providers.module';
import { PipesModule } from '../pipes/pipes.module';
import { LoginModule } from '../pages/login/login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    IonicModule.forRoot(AppComponent),
    ProvidersModule,
    SharedModule,
    PipesModule,
    LoginModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent
  ],
  providers: []
})
export class AppModule {}
