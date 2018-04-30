import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';

import { RegisterAddressPage } from '../register-address/register-address';
import { RegisterUser } from '../../models/RegisterUser';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { CustomValidators } from '../../utils/CustomValidators';
import { EditUser } from '../../models/EditUser';
import { ResponseUser } from '../../models/ResponseUser';

@IonicPage()
@Component({
  selector: 'page-detail-user',
  templateUrl: 'detail-user.html',
})
export class DetailUserPage {
  public user: EditUser = new EditUser();
  public formGroup: FormGroup;
  public confirmPassward: string;
  public cpf = '';

  constructor(
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController,
    private _alertCtrl: AlertController,
    private _formBuilder: FormBuilder,
    private _usuarioProvider: UsuarioProvider
  ) {
    this.formGroup = this._formBuilder.group({
      nome: ['', [
        CustomValidators.required,
        CustomValidators.minLength(3),
        CustomValidators.maxLength(20)
      ]],
      sobrenome: ['', [
        CustomValidators.required,
        CustomValidators.minLength(3),
        CustomValidators.maxLength(20)
      ]],
      email: ['', [
        CustomValidators.required,
        CustomValidators.email
      ]],
      cpf: ['', [
        CustomValidators.required,
        CustomValidators.cpf
      ]],
      celular: ['', [
        CustomValidators.required,
        CustomValidators.tel
      ]],
      nascimento: ['', CustomValidators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailUserPage');

    const loading = this._loadingCtrl.create({
      content: 'Buscando dados do usuário...'
    });
    loading.present();

    const responseUser: ResponseUser =
      JSON.parse(localStorage.getItem('user'));

    console.log(responseUser);

    loading.dismiss();

    this.user.nome = responseUser.nomeUsuario;
    this.user.sobrenome = responseUser.sobrenomeUsuario;
    this.user.celular = String(responseUser.celularUsuario);
    this.user.email = responseUser.emailUsuario;
    this.user.nascimento = responseUser.nascimentoUsuario;
    this.user.cpf = String(responseUser.CPFUsuario);

    this.formGroup.controls['nome'].setValue(responseUser.nomeUsuario);
    this.formGroup.controls['sobrenome'].setValue(responseUser.sobrenomeUsuario);
    this.formGroup.controls['celular'].setValue(String(responseUser.celularUsuario));
    this.formGroup.controls['email'].setValue(responseUser.emailUsuario);
    this.formGroup.controls['nascimento'].setValue(responseUser.nascimentoUsuario);
    this.formGroup.controls['cpf'].setValue(String(responseUser.CPFUsuario));

    this.formGroup.valueChanges.subscribe(value => this.markAsTouchedFields(value));
  }

  updateUser() {
    if (!this.formGroup.valid) {
      const alert = this._alertCtrl.create({
        title: 'Erro ao alterar dados do usuário',
        subTitle: 'Preencha todos os campos da forma correta!',
        buttons: ['OK']
      });
      alert.present();
      console.log(this.user);

      return;
    }

    const loading = this._loadingCtrl.create({
      content: 'Alterando dados...'
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();
      console.log(this.user);
    }, 1000);

    // this
    //   ._usuarioProvider
    //   .put(this.user)
    //   .subscribe(
    //     res => {
    //       loading.dismiss();
    //       console.log(res)
    //       this._navCtrl.pop();
    //     },
    //     err => {
    //       loading.dismiss();
    //       console.log(err)
    //       this._navCtrl.pop();
    //     }
    //   )
  }

  markAsTouchedFields(value: Object) {
    let fields = ['nome', 'sobrenome', 'email', 'cpf', 'celular', 'nascimento'];
    fields.forEach((field) => this.formGroup.controls[field].markAsTouched());
  }

  buildNascimento(event) {
    this.user.nascimento = `${event.year}-${event.month}-${event.day}`;
  }

  registerAddress() {
    this._navCtrl.push(RegisterAddressPage.name);
  }
}
