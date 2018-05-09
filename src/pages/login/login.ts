import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, AlertOptions } from 'ionic-angular';

import { Login } from '../../models/login';
import { RegisterUserPage } from '../register-user/register-user';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public login: Login = new Login();

  constructor(
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController
  ) {}

  logar() {
    const loading = this._loadingCtrl.create({
      content: 'Buscando usuário...'
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();
      console.log('login', this.login);

      // Em caso de erro no login
      // const alert = this._alertCtrl.create({
      //   title: 'Erro ao logar',
      //   subTitle: 'Login ou senha inválida.',
      //   buttons: ['OK']
      // });
      // alert.present();

      // Erro de conexão
      // const alert = this._alertCtrl.create({
      //   title: 'Erro ao logar',
      //   subTitle: 'Para logar você precisa esta conectado a internet.',
      //   buttons: ['OK']
      // });
      // alert.present();

      this._navCtrl.setRoot(MapPage.name, {userId: 11});
    }, 1000);
  }

  register() {
    this._navCtrl.push(RegisterUserPage.name);
  }

  forgotPassword() {
    this._navCtrl.push(ForgotPasswordPage.name);
  }
}
