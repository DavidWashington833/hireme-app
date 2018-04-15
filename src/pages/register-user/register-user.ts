import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';

import { RegisterUser } from './../../models/RegisterUser';

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {
  private user: RegisterUser = new RegisterUser();
  private senha2: string;

  constructor(
    private _navCtrl: NavController,
    private _navParams: NavParams,
    private _formBuild: FormBuilder,
    private _usuarioProvider: UsuarioProvider
  ) {}

  ionViewDidLoad() {}

  register() {
    this
      ._usuarioProvider
      .post(this.user)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
    this._navCtrl.pop();
  }

  buildNascimento(event) {
    this.user.nascimento = `${event.day}-${event.month}-${event.year}`;
  }

}
