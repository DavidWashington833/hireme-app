import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroServicoPage } from '../cadastro-servico/cadastro-servico';

/**
 * Generated class for the CadastroPrestadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-prestador',
  templateUrl: 'cadastro-prestador.html',
})
export class CadastroPrestadorPage {
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
