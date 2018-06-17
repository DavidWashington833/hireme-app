import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

@Injectable()
export class PositionProvider {

  constructor(
    private geolocation: Geolocation
  ) {}

  getUserPosition() {
    return this.geolocation.watchPosition();
  }
}
