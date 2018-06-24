import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Events } from 'ionic-angular';

import { RegisterAddressPage } from '../register-address/register-address';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { CustomValidators } from '../../utils/CustomValidators';
import { EditUser } from '../../models/EditUser';
import { ResponseUser } from '../../models/ResponseUser';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-detail-user',
  templateUrl: 'detail-user.html',
})
export class DetailUserPage {
  public user: EditUser = new EditUser();
  public formGroup: FormGroup;
  public confirmPassward: string;
  public usuarioId: number;
  public cpf = '';

  constructor(
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController,
    private _alertCtrl: AlertProvider,
    private _formBuilder: FormBuilder,
    private _events: Events,
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

    this.usuarioId = responseUser.idUsuario;
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
    console.log('--------------------->', this.user);
    console.log('--------------------->', JSON.stringify(this.user));
    if (!this.formGroup.valid) {
      this.alertInvalidFields();
      return;
    }

    const loading = this._loadingCtrl.create({
      content: 'Alterando dados...'
    });
    loading.present();

    this
      ._usuarioProvider
      .put(this.usuarioId, this.user)
      .subscribe(
        res => {
          localStorage.setItem('user', JSON.stringify(res));
          this.createUser(localStorage.getItem('user'));
          loading.dismiss();
          this.alertSuccessRegister();
        },
        err => {
          loading.dismiss();
          this.alertNoConnection();
        }
      );
  }

  private createUser(user) {
    const responseUser: ResponseUser = JSON.parse(user);
    this._events.publish('user:update', responseUser);
  }

  private alertNoConnection() {
    this._alertCtrl.show({
      title: 'Erro ao editar dados',
      subTitle: 'Para editar você precisa esta conectado a internet.',
      buttons: ['OK']
    });
  }

  private alertSuccessRegister() {
    this._alertCtrl.show({
      title: 'Atualização de dados efetuado com sucesso!',
      subTitle: 'Seus dados foram alterados.',
      buttons: [
        {
          text: 'OK',
          handler: () => { this._navCtrl.pop(); }
        },
      ]
    });
  }

  private alertInvalidFields() {
    this._alertCtrl.show({
      title: 'Erro ao alterar dados do usuário',
      subTitle: 'Preencha todos os campos da forma correta!',
      buttons: ['OK']
    });
  }

  markAsTouchedFields(value: Object) {
    const fields = ['nome', 'sobrenome', 'email', 'cpf', 'celular', 'nascimento'];
    fields.forEach((field) => this.formGroup.controls[field].markAsTouched());
  }

  buildNascimento(event) {
    this.user.nascimento = `${event.year}-${event.month}-${event.day}`;
  }

  registerAddress() {
    this._navCtrl.push(RegisterAddressPage.name);
  }
}
