import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MapaPage } from '../mapa/mapa';

@IonicPage()
@Component({
  selector: 'page-register-service',
  templateUrl: 'register-service.html',
})
export class RegisterServicePage {
  nome: string;
  preco: string;
  descricao: string;

  constructor(
    private _navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroServicoPage');
  }

  cadastrar() {
    this._navCtrl.pop();
  }

}
