import { BrowserModule } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, Form } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBeYIszBebgBTI-HAlw0uXXRMo25gohQv4'
    }),
    IonicStorageModule.forRoot({
      name: 'localdb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  providers: [
    Geolocation,
    GoogleMapsAPIWrapper,
    Form,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
})
export class SharedModule {}
