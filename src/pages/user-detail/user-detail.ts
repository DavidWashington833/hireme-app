import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { RegisterAddressPage } from '../register-address/register-address';

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {

  constructor(
    private _navCtrl: NavController
  ) {}

  goEndereco() {
    this._navCtrl.push(RegisterAddressPage.name);
  }

}
