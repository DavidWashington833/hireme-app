import { DetailRequestPage } from './../detail-request/detail-request';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {

  constructor(
    private _navCtrl: NavController
  ) {}

  detalhePedido() {
    this._navCtrl.push(DetailRequestPage.name);
  }

}
