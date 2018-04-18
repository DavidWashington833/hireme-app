import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

import { RegisterUser } from './../../models/RegisterUser';
import { UsuarioProvider } from './../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {
  private user: RegisterUser = new RegisterUser();
  private senha2: string;

  constructor(
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController,
    private _usuarioProvider: UsuarioProvider
  ) {}

  ionViewDidLoad() {}

  register() {
    const loading = this._loadingCtrl.create({
      content: 'Cadastrando...'
    });
    loading.present();

    this
      ._usuarioProvider
      .post(this.user)
      .subscribe(
        res => {
          loading.dismiss();
          console.log(res)
          this._navCtrl.pop();
        },
        err => {
          loading.dismiss();
          console.log(err)
          this._navCtrl.pop();
        }
      )
  }

  buildNascimento(event) {
    this.user.nascimento = `${event.year}-${event.month}-${event.day}`;
  }

}
