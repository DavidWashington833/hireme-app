
import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';

declare var google: any;

@Injectable()
export class GMapsServiceProvider extends GoogleMapsAPIWrapper {
  constructor(private __loader: MapsAPILoader, private __zone: NgZone, private mapsAPILoader: MapsAPILoader) {
    super(__loader, __zone);
  }

  getLatLan(address: string): Observable<any> {
    console.log('Getting Address - ', address);
    console.log('google script loaded');

    return Observable.create(observer => {
      this.mapsAPILoader.load().then(() => {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function (results, status) {
          console.log('--------------------------------------->', results);
          if (status == google.maps.GeocoderStatus.OK) {
            observer.next(results[0].geometry.location);
            observer.complete();
          } else {
            console.log('Error - ', results, ' & Status - ', status);
            observer.next({});
            observer.complete();
          }
        });
      })
      .catch(err => {

        console.log('Error -  & Status - ', err);
        observer.next({});
        observer.complete();
      });
    })
  }
}
