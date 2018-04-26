import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SharedModule } from './shared/shared.module';
import { UsuarioProvider } from './../providers/usuario/usuario';
import { ProvidersModule } from './../providers/providers.module';
import { MapPage } from '../pages/map/map';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    MapPage
  ],
  imports: [
    SharedModule,
    IonicModule.forRoot(AppComponent),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBeYIszBebgBTI-HAlw0uXXRMo25gohQv4'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MapPage,
    AppComponent,
    LoginPage
  ],
  providers: [
    ProvidersModule,
    UsuarioProvider
  ]
})
export class AppModule {}
