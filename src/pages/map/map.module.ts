import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MapPage,
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBeYIszBebgBTI-HAlw0uXXRMo25gohQv4'
    })
  ],
  exports: [
    MapPage
  ]
})
export class MapPageModule {}
