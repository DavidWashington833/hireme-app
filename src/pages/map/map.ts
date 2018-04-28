import { RequestPage } from '../request/request';
import { DetailUserPage } from '../detail-user/detail-user';
import { Prestador } from '../../models/prestador';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DetailProviderPage } from '../detail-provider/detail-provider';
import { SearchPage } from '../search/search';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  styleArray = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ];

  latitude: number = -23.737156;
  longitude: number = -46.691307;

  providers: Array<Prestador>;

  constructor(
    private _navCtrl: NavController
  ) {
    this.providers = [
      { id: 1, icon: 'assets/imgs/employees.png', latitude: -23.738156, longitude: -46.692307 },
      { id: 2, icon: 'assets/imgs/employees.png', latitude: -23.739156, longitude: -46.691307 },
      { id: 3, icon: 'assets/imgs/employees.png', latitude: -23.732156, longitude: -46.691107 },
      { id: 4, icon: 'assets/imgs/employees.png', latitude: -23.731156, longitude: -46.691707 },
      { id: 5, icon: 'assets/imgs/employees.png', latitude: -23.732156, longitude: -46.691307 }
    ];
    setTimeout(() => {
      this.providers.push({ id: 6, icon: 'assets/imgs/employees.png', latitude: -23.737156, longitude: -46.691307 });
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  detailProvider(id: number) {
    this._navCtrl.push(DetailProviderPage.name, { id: id });
  }

  detailUser() {
    this._navCtrl.push(DetailUserPage.name);
  }

  request() {
    this._navCtrl.push(RequestPage.name);
  }

  search() {
    this._navCtrl.push(SearchPage.name);
  }

}
