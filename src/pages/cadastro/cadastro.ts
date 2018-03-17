import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  private nome: string;
  private sobrenome: string;
  private email: string;
  private senha: string;
  private senha2: string;
  private cpf: string;
  private celular: string;
  private nascimento: string;

  constructor(
    private _navCtrl: NavController,
    private _navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  cadastrar() {
    this._navCtrl.pop();
  }

}
