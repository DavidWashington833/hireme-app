import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register-address',
  templateUrl: 'register-address.html',
})
export class RegisterAddressPage {

  constructor(
    private _navCtrl: NavController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterAddressPage');
  }

  register() {
    this._navCtrl.pop();
  }

}
