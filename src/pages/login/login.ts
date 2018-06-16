import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoadingProvider } from './../../providers/loading/loading';
import { UserStorageProvider } from './../../providers/user-storage/user-storage';
import { Login } from '../../models/login';
import { RegisterUserPage } from '../register-user/register-user';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { MapPage } from '../map/map';
import { LoginProvider } from '../../providers/login/login';
import { AlertProvider } from '../../providers/alert/alert';
import { ResponseUser } from '../../models/ResponseUser';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: Login = new Login();

  constructor(
    private alertProvider: AlertProvider,
    private loadingProvider: LoadingProvider,
    private navCtrl: NavController,
    private loginProvider: LoginProvider,
    private userStorageProvider: UserStorageProvider
  ) {}

  ionViewDidLoad() {
    if (this.userStorageProvider.isLogged()) {
      const user = this.userStorageProvider.getUser();
      this.openMap(user.idUsuario);
    }
  }

  logar() {
    this.showLoading();

    this.loginProvider
      .post(this.login)
      .subscribe(
        (res) => this.successResponse(res),
        (err) => this.errorRequest(err),
        () => this.hideLoading()
      );
  }

  errorRequest(err: any) {
    if (err.status === '404') {
      this.alertProvider.show({
        title: 'Erro ao logar',
        subTitle: 'Login ou senha inválida.',
        buttons: ['OK']
      });
    } else {
      this.alertProvider.show({
        title: 'Erro ao logar',
        subTitle: 'Para logar você precisa esta conectado a internet.',
        buttons: ['OK']
      });
    }
  }

  successResponse(res: ResponseUser) {
    if (res.ativoUsuario) {
      this.navCtrl.setRoot(MapPage.name, { userId: res.idUsuario });
    } else {
      this.alertProvider.show({
        title: 'Erro ao logar',
        subTitle: 'Você precisa confirma seu email, verifique na sua caixa de entrada ou no spam.',
        buttons: ['OK']
      });
    }
  }

  hideLoading() {
    this.loadingProvider.hide();
  }

  showLoading() {
    this.loadingProvider.show({
      content: 'Buscando usuário...'
    });
  }

  openMap(id: number) {
    this.navCtrl.setRoot(MapPage.name, { userId: id });
  }

  openRegisterUser() {
    this.navCtrl.push(RegisterUserPage.name);
  }

  openForgotPassword() {
    this.navCtrl.push(ForgotPasswordPage.name);
  }
}
