import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';

@IonicPage()
@Component({
  selector: 'page-detail-request',
  templateUrl: 'detail-request.html',
})
export class DetailRequestPage {

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
