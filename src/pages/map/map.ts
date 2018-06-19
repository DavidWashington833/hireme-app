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
import { UserStorageProvider } from '../../providers/user-storage/user-storage';
import { PositionProvider } from '../../providers/position/position';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  styleMap: any = [];
  providers: Array<Prestador> = [];
  latitude: number | string = -23.737156;
  longitude: number | string = -46.691307;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
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
        styleMap => this.styleMap = styleMap,
        err => console.log('erro ao carregar styleArray', err)
      );

    this.getUser();

    this.getUserProvider();

    this.positionProvider
      .getUserPosition()
      .subscribe(
        position => {
          const {longitude, latitude} = position.coords;
          this.setPostion(longitude, latitude);
          this.getProviders()
            .subscribe(providers =>
                this.providers =
                  providers
                    .filter(p => p.idUsuario !== Number(this.navParams.get('userId')))
                    .map(p => this.buildPrestador(p)),
              error => console.log(error)
            );
        },
        err => console.log('erro ao pegar posição do usuário', err)
      );
  }

  getProviders() {
    return this.prestadorProvider
      .getForCoords(this.latitude, this.longitude);
  }

  buildPrestador(responseProvider: ResponseProvider) {
    const provider = new Prestador();
    provider.id = responseProvider.idPrestador;
    provider.latitude = Number(responseProvider.latitudePrestador);
    provider.longitude = Number(responseProvider.longitudePrestador);
    return provider;
  }

  setPostion(longitude: string | number, latitude: string | number): void {
    this.longitude = longitude;
    this.latitude = latitude;
  }

  getUser() {
    this.usuarioProvider
      .get(this.navParams.get('userId'))
      .subscribe(user => {
        this.userStorage.setUser(user);
        this.publishLoadUser(this.userStorage.getUser());
      }, err => console.error('erro ao buscar usuário', err));
  }

  getUserProvider() {
    this.prestadorProvider
      .getForUser(this.navParams.get('userId'))
      .subscribe(provider => {
        this.userStorage.setProvider(provider);
        this.publishLoadProvider(provider);
      }, err => console.error('erro ao buscar prestador', err));
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
