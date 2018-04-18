import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { MapaPage } from './../mapa/mapa';

@IonicPage()
@Component({
  selector: 'page-prestador-cadastrado',
  templateUrl: 'prestador-cadastrado.html',
})
export class PrestadorCadastradoPage {

  constructor(
    private _navCtrl: NavController
  ) {}

  goMap() {
    this._navCtrl.setRoot(MapaPage.name);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrestadorCadastradoPage');
  }

}
