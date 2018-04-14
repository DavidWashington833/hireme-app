import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RegisterUser } from './../../models/RegisterUser';

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {
  private user: RegisterUser = new RegisterUser();
  private senha2: string;

  constructor(
    private _navCtrl: NavController,
    private _navParams: NavParams
  ) {}

  ionViewDidLoad() {}

  cadastrar() {
    console.log(JSON.parse(JSON.stringify(this.user)));
    // this._navCtrl.pop();
  }

}
