import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { RecuperacaoDeSenhaPage } from '../recuperacao-de-senha/recuperacao-de-senha';
import { MapaPage } from '../mapa/mapa';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private email: string;
  private senha: string;

  constructor(private _navCtrl: NavController) {}

  logar() {
    this._navCtrl.push(MapaPage.name);
  }

  cadastrar() {
    this._navCtrl.push(CadastroPage.name);
  }

  recuperarSenha() {
    this._navCtrl.push(RecuperacaoDeSenhaPage.name);
  }

}
