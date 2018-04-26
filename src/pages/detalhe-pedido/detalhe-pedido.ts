import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';

/**
 * Generated class for the DetalhePedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhe-pedido',
  templateUrl: 'detalhe-pedido.html',
})
export class DetalhePedidoPage {

  constructor(
    private _navCtrl: NavController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhePedidoPage');
  }

  goMapa() {
    this._navCtrl.push(MapPage.name);
  }

}
