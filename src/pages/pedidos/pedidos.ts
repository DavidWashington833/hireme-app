import { DetailRequestPage } from './../detail-request/detail-request';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  constructor(
    private _navCtrl: NavController
  ) {}

  detalhePedido() {
    this._navCtrl.push(DetailRequestPage.name);
  }

}
