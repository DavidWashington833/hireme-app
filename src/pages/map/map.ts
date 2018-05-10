import { Geolocation } from '@ionic-native/geolocation';
import { PrestadorProvider } from './../../providers/prestador/prestador';
import { RequestPage } from '../request/request';
import { DetailUserPage } from '../detail-user/detail-user';
import { Prestador } from '../../models/prestador';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { DetailProviderPage } from '../detail-provider/detail-provider';
import { SearchPage } from '../search/search';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ResponseUser } from '../../models/ResponseUser';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';

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
    private _geolocation: Geolocation,
    private _navCtrl: NavController,
    private _navParams: NavParams,
    private _loadingCtrl: LoadingProvider,
    private _alertCtrl: AlertProvider,
    private _usuarioProvider: UsuarioProvider,
    private _prestadorProvider: PrestadorProvider,
    private _events: Events
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
    console.log('id do usuario', this._navParams.get('userId'));
    this.getUser();
    this.getCoords();
  }

  private getCoords() {
    this._geolocation.watchPosition().subscribe(res => {
      console.log('pegando cordenadas usuário', res);
      this.longitude = res.coords.longitude;
      this.latitude = res.coords.latitude;
     },
     error => {
       console.error('erro ao pegar cordenadas do usuário', error);
     });
  }

  private getUser() {
    this._loadingCtrl.show({content: 'Buscando dados do usuário...'});
    this._usuarioProvider
      // .get(this._navParams.get('userId'))
      .get(1)
      .subscribe(res => {
        console.log('resposta da busca por usuário', res);
        localStorage.setItem('user', JSON.stringify(res));
        this._loadingCtrl.hide();
        this.createUser(localStorage.getItem('user'));
      }, err => {
        console.error('erro ao buscar usuário', err);
        this._loadingCtrl.hide();
      });

    this._prestadorProvider
      // .get(this._navParams.get('userId'))
      .get(1)
      .subscribe(
      res => {
        console.log('resposta ao buscar prestador', res)
      },
      err => {
        console.error('erro ao buscar prestador', err)
      });
  }

  private createUser(user) {
    this._events.publish('user:created', user);
  }

  private detailProvider(id: number) {
    this._navCtrl.push(DetailProviderPage.name, { id: id });
  }

  private detailUser() {
    this._navCtrl.push(DetailUserPage.name);
  }

  private request() {
    this._navCtrl.push(RequestPage.name);
  }

  private search() {
    this._navCtrl.push(SearchPage.name);
  }

}
