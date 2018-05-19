import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

import { AppComponent } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SharedModule } from './shared/shared.module';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { ProvidersModule } from '../providers/providers.module';
import { MapPage } from '../pages/map/map';
import { AlertProvider } from '../providers/alert/alert';
import { LoadingProvider } from '../providers/loading/loading';
import { EnderecoProvider } from '../providers/endereco/endereco';
import { PrestadorProvider } from '../providers/prestador/prestador';
import { LoginProvider } from '../providers/login/login';
import { GMapsServiceProvider } from '../providers/g-maps-service/g-maps-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    MapPage,
  ],
  imports: [
    SharedModule,
    IonicModule.forRoot(AppComponent),
    IonicStorageModule.forRoot({
      name: 'localdb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBeYIszBebgBTI-HAlw0uXXRMo25gohQv4'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    LoginPage,
    MapPage
  ],
  providers: [
    Geolocation,
    ProvidersModule,
    UsuarioProvider,
    AlertProvider,
    LoadingProvider,
    EnderecoProvider,
    PrestadorProvider,
    LoginProvider,
    GMapsServiceProvider,
    GoogleMapsAPIWrapper
  ]
})
export class AppModule {}
