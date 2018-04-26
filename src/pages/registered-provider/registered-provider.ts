import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { MapPage } from './../map/map';

@IonicPage()
@Component({
  selector: 'page-registered-provider',
  templateUrl: 'registered-provider.html',
})
export class RegisteredProviderPage {

  constructor(
    private _navCtrl: NavController
  ) {}

  goMap() {
    this._navCtrl.setRoot(MapPage.name);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrestadorCadastradoPage');
  }

}
