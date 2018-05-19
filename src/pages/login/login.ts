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
    console.log('login', this.login);
    const loading = this._loadingCtrl.create({
      content: 'Buscando usuário...'
    });
    loading.present();

    this._loginProvider
      .post(this.login)
      .subscribe(
        res => {
          console.log(res)
          loading.dismiss();
          if (res.ativoUsuario) {
            this._navCtrl.setRoot(MapPage.name, {userId: res.idUsuario});
          }
          else {
            const alert = this._alertCtrl.create({
              title: 'Erro ao logar',
              subTitle: 'Você precisa confirma seu email, verifique na sua caixa de entrada ou no spam.',
              buttons: ['OK']
            });
            alert.present();
          }
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
  }

  register() {
    this._navCtrl.push(RegisterUserPage.name);
  }

  forgotPassword() {
    this._navCtrl.push(ForgotPasswordPage.name);
  }
}
