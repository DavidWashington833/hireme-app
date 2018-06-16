import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';

import { UsuarioProvider } from '../../providers/usuario/usuario';
import { CustomValidators } from '../../utils/CustomValidators';
import { AlertProvider } from './../../providers/alert/alert';
import { RegisterUser } from '../../models/RegisterUser';
import { LoadingProvider } from '../../providers/loading/loading';
import { HandlerFields } from '../../utils/HandlerFields';
import { Format } from './../../utils/Format';

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {
  user: RegisterUser = new RegisterUser();
  formGroup: FormGroup;
  confirmPassward: string;
  cpf = '';
  celular = '';

  constructor(
    private loadingProvider: LoadingProvider,
    private navCtrl: NavController,
    private alertProvider: AlertProvider,
    private formBuilder: FormBuilder,
    private usuarioProvider: UsuarioProvider
  ) {
    this.formGroup = this.formBuilder.group({
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
      senha: ['', [
        CustomValidators.required,
        CustomValidators.minLength(3),
        CustomValidators.maxLength(20)
      ]],
      confirmPassward: ['', [
        CustomValidators.required,
        CustomValidators.confirmPassward,
        CustomValidators.minLength(3),
        CustomValidators.maxLength(20)
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
    this.formGroup.valueChanges.subscribe(value => HandlerFields.markAsTouchedFields(this.formGroup));
  }

  register() {
    if (!this.formGroup.valid) {
      this.alertInvalidFields();
      return;
    }

    this.showLoading();

    this
      .usuarioProvider
      .post(this.user)
      .subscribe(
        res => {
          this.hideLoading();
          this.alertSuccessRegister();
        },
        err => {
          this.hideLoading();
          this.alertNoConnection();
        }
      );
  }

  hideLoading() {
    this.loadingProvider.hide();
  }

  showLoading() {
    this.loadingProvider.show({
      content: 'Cadastrando...'
    });
  }

  alertNoConnection() {
    this.alertProvider.show({
      title: 'Erro ao cadastrar',
      subTitle: 'Para se cadastrar você precisa esta conectado a internet.',
      buttons: ['OK']
    });
  }

  alertSuccessRegister() {
    this.alertProvider.show({
      title: 'Cadastro efetuado com sucesso!',
      subTitle: 'Verifique sua caixa de email para confirmar sua conta.',
      buttons: [
        {
          text: 'OK',
          handler: () => { this.navCtrl.pop(); }
        },
      ]
    });
  }

  alertInvalidFields() {
    this.alertProvider.show({
      title: 'Erro ao cadastrar',
      subTitle: 'Preencha todos os campos da forma correta!',
      buttons: ['OK']
    });
  }

  buildNascimento(event) {
    this.user.nascimento = Format.dateYMD(event.year, event.month, event.day);
  }
}
