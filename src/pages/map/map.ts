import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
import { UserStorageProvider } from '../../providers/user-storage/user-storage';
import { PositionProvider } from '../../providers/position/position';

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
    private userStorage: UserStorageProvider,
    private positionProvider: PositionProvider
  ) {}

  ionViewDidLoad() {
    this.httpClient
      .get('/assets/json/map.json')
      .subscribe(
        res => this.styleArray = res,
        err => console.log('erro ao carregar styleArray', err)
      );

    this.getUser();

    this.positionProvider
      .getUserPosition()
      .subscribe(
        res => {
          const {longitude, latitude} = res.coords;
          this.setPostion(longitude, latitude);
          this.getProviders(Number(this.navParams.get('userId')));
        },
        err => console.log('erro ao pegar posição do usuário', err)
      );
  }

  getProviders(id: number) {
    this.prestadorProvider
      .getForCoords(this.latitude, this.longitude)
      .subscribe(res =>
        this.providers =
          res
            .filter(p => p.idUsuario !== id)
            .map(p => this.buildPrestador(p)),
        error => console.log(error)
      );
  }

  private buildPrestador(p: ResponseProvider) {
    const provider = new Prestador();
    provider.icon = 'assets/imgs/employees.png';
    provider.id = p.idPrestador;
    provider.latitude = Number(p.latitudePrestador);
    provider.longitude = Number(p.longitudePrestador);
    return provider;
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
          this.getProviders(res ? res.idPrestador : 0);
          console.log('resposta ao buscar prestador', res);
          this.userStorage.setProvider(res);
          this.publishLoadProvider(res);
        },
        err => {
          console.error('erro ao buscar prestador', err);
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
