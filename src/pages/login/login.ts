import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterUserPage } from '../register-user/register-user';
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
    this._navCtrl.setRoot(MapaPage.name);
  }

  cadastrar() {
    this._navCtrl.push(RegisterUserPage.name);
  }

  recuperarSenha() {
    this._navCtrl.push(RecuperacaoDeSenhaPage.name);
  }

}
