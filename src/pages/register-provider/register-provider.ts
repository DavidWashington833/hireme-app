import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PrestadorCadastradoPage } from '../prestador-cadastrado/prestador-cadastrado';

@IonicPage()
@Component({
  selector: 'page-register-provider',
  templateUrl: 'register-provider.html',
})
export class RegisterProviderPage {
  conta: string;
  agencia: string;
  endereco: string = 'endereco1';
  relationship: string = 'friends';

  constructor(
    private _navCtrl: NavController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPrestadorPage');
  }

  cadastrar() {
    this._navCtrl.push(PrestadorCadastradoPage.name);
  }

  segmentChanged(event) {
    console.log(event);
  }
}
