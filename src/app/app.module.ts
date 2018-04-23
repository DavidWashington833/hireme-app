import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SharedModule } from './shared/shared.module';
import { UsuarioProvider } from './../providers/usuario/usuario';
import { ProvidersModule } from './../providers/providers.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage
  ],
  imports: [
    SharedModule,
    IonicModule.forRoot(AppComponent)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    LoginPage
  ],
  providers: [
    ProvidersModule,
    UsuarioProvider
  ]
})
export class AppModule {}
