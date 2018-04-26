import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { RegisterAddressPage } from '../register-address/register-address';

@IonicPage()
@Component({
  selector: 'page-detail-user',
  templateUrl: 'detail-user.html',
})
export class DetailUserPage {

  constructor(
    private _navCtrl: NavController
  ) {}

  goEndereco() {
    this._navCtrl.push(RegisterAddressPage.name);
  }

}
