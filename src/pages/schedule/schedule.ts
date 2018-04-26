import { DetalhePedidoPage } from './../detalhe-pedido/detalhe-pedido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

  constructor(
    private _navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicosPage');
  }

  detalhePedido() {
    this._navCtrl.push(DetalhePedidoPage.name);
  }
}