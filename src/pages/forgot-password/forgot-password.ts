import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  private email: string;

  constructor(
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  send() {
    const loading = this._loadingCtrl.create({
      content: 'Enviando email de recuperação...'
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();

      // Em caso de recuperação
      // const alert = this._alertCtrl.create({
      //   title: 'Erro na recuperação',
      //   subTitle: 'Email não encontrado!',
      //   buttons: ['OK']
      // });
      // alert.present();

      // this._navCtrl.pop();
    }, 1000);
  }
}
