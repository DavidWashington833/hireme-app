import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { PrestadorProvider } from './../../providers/prestador/prestador';
import { RequestPage } from '../request/request';
import { DetailUserPage } from '../detail-user/detail-user';
import { Prestador } from '../../models/prestador';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { DetailProviderPage } from '../detail-provider/detail-provider';
import { SearchPage } from '../search/search';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ResponseUser } from '../../models/ResponseUser';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';
import { google } from '@agm/core/services/google-maps-types';
import { GMapsServiceProvider } from '../../providers/g-maps-service/g-maps-service';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  styleArray: any = [];

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
    private _httpClient: HttpClient,
    private _events: Events,
    private _mapsAPILoader: MapsAPILoader,
    private _ngZone: NgZone
  ) {

    this._httpClient.get('/assets/json/map.json').
      subscribe(res => {
        this.styleArray = res
      }, err => console.log(err))
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

  getLocation(address: string): Observable<any> {
    console.log('Getting address: ', address);
    let geocoder = new google.maps.Geocode();
    return Observable.create(observer => {
      geocoder.geocode({
        'address': address
      }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          observer.next(results[0].geometry.location);
          observer.complete();
        } else {
          console.log('Error: ', results, ' & Status: ', status);
          observer.error();
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    console.log('id do usuario', this._navParams.get('userId'));
    this.getUser();
    this.getCoords().then((res: Geoposition) => {
      this.longitude = res.coords.longitude;
      this.latitude = res.coords.latitude;
      console.log('pegando cordenadas usuário', res);

      this._prestadorProvider.getForCoords(this.latitude, this.longitude)
        .subscribe(
          res => console.log('getForCoords', res),
          error => console.log('getForCoords', error)
        );

    }).catch(error => console.log(error));
  }

  private getCoords() {
    return new Promise((resolve, reject) => {
      this._geolocation
        .watchPosition()
        .subscribe(
          (res: Geoposition) => resolve(res),
          error => reject(error)
        );
    });
  }

  private getUser() {
    this._loadingCtrl.show({ content: 'Buscando dados do usuário...' });
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
          this.isProvider(res != null);
        },
        err => {
          console.error('erro ao buscar prestador', err)
          this.isProvider(false);
        });
  }

  private isProvider(v: boolean) {
    this._events.publish('user:provider', v);
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
