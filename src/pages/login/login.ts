import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, AlertOptions } from 'ionic-angular';

import { Login } from '../../models/login';
import { RegisterUserPage } from '../register-user/register-user';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { MapPage } from '../map/map';
import { LoginProvider } from '../../providers/login/login';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public login: Login = new Login();

  constructor(
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController,
    private _loginProvider: LoginProvider
  ) {}

  logar() {
    const loading = this._loadingCtrl.create({
      content: 'Buscando usuário...'
    });
    loading.present();

    this._loginProvider.post(this.login)
      .subscribe(
        res => {
          console.log(res)
          loading.dismiss();
          this._navCtrl.setRoot(MapPage.name, {userId: res.idUsuario});
        },
        err => {
          console.log(err)
          loading.dismiss();
          if (err.status == 404) {
            const alert = this._alertCtrl.create({
              title: 'Erro ao logar',
              subTitle: 'Login ou senha inválida.',
              buttons: ['OK']
            });
            alert.present();
          }
          else {
            const alert = this._alertCtrl.create({
              title: 'Erro ao logar',
              subTitle: 'Para logar você precisa esta conectado a internet.',
              buttons: ['OK']
            });
            alert.present();
          }
        })

    console.log('login', this.login);
  }

  register() {
    this._navCtrl.push(RegisterUserPage.name);
  }

  forgotPassword() {
    this._navCtrl.push(ForgotPasswordPage.name);
  }
}
