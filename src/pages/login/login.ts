import { Login } from './../../models/login';
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { RegisterUserPage } from '../register-user/register-user';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { MapPage } from '../map/map';
import { CustomValidators } from '../../utils/custom-validators';
import { FormGroup, FormBuilder } from '@angular/forms';

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
      console.log(this.login);

      // const alert = this._alertCtrl.create({
      //   title: 'Erro ao logar',
      //   subTitle: 'Usuário não encontrado!',
      //   buttons: ['OK']
      // });
      // alert.present();
    }, 1000);

    // this._navCtrl.setRoot(MapPage.name);
  }

  cadastrar() {
    this._navCtrl.push(RegisterUserPage.name);
  }

  recuperarSenha() {
    this._navCtrl.push(ForgotPasswordPage.name);
  }

}
