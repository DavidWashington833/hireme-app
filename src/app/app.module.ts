import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SharedModule } from './shared/shared.module';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { ProvidersModule } from '../providers/providers.module';
import { MapPage } from '../pages/map/map';
import { AlertProvider } from '../providers/alert/alert';
import { LoadingProvider } from '../providers/loading/loading';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    // MapPage,
  ],
  imports: [
    SharedModule,
    IonicModule.forRoot(AppComponent),
    IonicStorageModule.forRoot({
      name: 'localdb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBeYIszBebgBTI-HAlw0uXXRMo25gohQv4'
    // })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    LoginPage,
    // MapPage
  ],
  providers: [
    ProvidersModule,
    UsuarioProvider,
    AlertProvider,
    LoadingProvider
  ]
})
export class AppModule {}
