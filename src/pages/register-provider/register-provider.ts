import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroServicoPage } from '../cadastro-servico/cadastro-servico';


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
    public _navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPrestadorPage');
  }

  cadastrar() {
    this._navCtrl.setRoot(CadastroServicoPage.name);
  }

  segmentChanged(event) {
    console.log(event);
  }
}
