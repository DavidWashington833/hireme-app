import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { ResponseProvider } from './../../models/ResponseProvider';
import { PrestadorProvider } from './../../providers/prestador/prestador';
import { RequestPage } from '../request/request';
import { DetailUserPage } from '../detail-user/detail-user';
import { Prestador } from '../../models/prestador';
import { DetailProviderPage } from '../detail-provider/detail-provider';
import { SearchPage } from '../search/search';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ResponseUser } from '../../models/ResponseUser';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { UserStorageProvider } from '../../providers/user-storage/user-storage';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  styleArray: any = [];
  providers: Array<Prestador> = [];
  latitude: number | string = -23.737156;
  longitude: number | string = -46.691307;

  constructor(
    private geolocation: Geolocation,
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingProvider: LoadingProvider,
    private usuarioProvider: UsuarioProvider,
    private prestadorProvider: PrestadorProvider,
    private httpClient: HttpClient,
    private events: Events,
    private userStorage: UserStorageProvider
  ) {
    this.httpClient
      .get('/assets/json/map.json')
      .subscribe(
        res => this.styleArray = res,
        err => console.log('erro ao carregar styleArray', err)
      );
  }

  ionViewDidLoad() {
    this.getUser();
    this.getUserPosition()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  getProviders(id: number) {
    this.getCoords().then((res: Geoposition) => {
      this.setPostion(res.coords.longitude, res.coords.latitude);

      this.prestadorProvider.getForCoords(this.latitude, this.longitude)
        .subscribe(res => {
          let v = res.map(p => {
            let provider = new Prestador();
            provider.icon = 'assets/imgs/employees.png';
            provider.id = p.idPrestador;
            provider.latitude = Number(p.latitudePrestador);
            provider.longitude = Number(p.longitudePrestador);
            return provider;
          });
          if (id != undefined) {
            this.providers = v.filter(p2 => p2.id != id);
          }
          else {
            this.providers = v;
          }
          console.log(this.providers);
        }, error => console.log(error));
    }).catch(error => console.log(error));
  }

  getUserPosition() {
    return this.geolocation.watchPosition().toPromise();
  }

  setPostion(longitude: string | number, latitude: string | number): void {
    this.longitude = longitude;
    this.latitude = latitude;
  }

  getCoords() {
    return new Promise((resolve, reject) => {
      this.geolocation
        .watchPosition()
        .subscribe(
          (res: Geoposition) => resolve(res),
          error => reject(error)
        );
    });
  }

  getUser() {
    this.loadingProvider.show({ content: 'Buscando dados do usuário...' });
    this.usuarioProvider
      .get(this.navParams.get('userId'))
      // .get(1)
      .subscribe(res => {
        this.userStorage.setUser(res);
        this.loadingProvider.hide();
        this.publishLoadUser(this.userStorage.getUser());
      }, err => {
        console.error('erro ao buscar usuário', err);
        this.loadingProvider.hide();
      });

    this.prestadorProvider
    // .getForUser(1)
      .getForUser(this.navParams.get('userId'))
      .subscribe(
        res => {
          this.getProviders(res ? res.idPrestador:0);
          console.log('resposta ao buscar prestador', res)
          this.userStorage.setProvider(res);
          this.publishLoadProvider(res);
        },
        err => {
          console.error('erro ao buscar prestador', err)
          this.publishLoadProvider(null);
        });
  }

  publishLoadProvider(provider: ResponseProvider) {
    this.events.publish('provider:load', provider);
  }

  publishLoadUser(user: ResponseUser) {
    this.events.publish('user:load', user);
  }

  openDetailProvider(id: number) {
    this.navCtrl.push(DetailProviderPage.name, { id: id });
  }

  openDetailUser() {
    this.navCtrl.push(DetailUserPage.name);
  }

  openRequest() {
    this.navCtrl.push(RequestPage.name);
  }

  openSearch() {
    this.navCtrl.push(SearchPage.name);
  }

}
