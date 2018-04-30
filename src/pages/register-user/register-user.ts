import { Format } from './../../utils/Format';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';

import { UsuarioProvider } from '../../providers/usuario/usuario';
import { CustomValidators } from '../../utils/CustomValidators';
import { AlertProvider } from './../../providers/alert/alert';
import { RegisterUser } from '../../models/RegisterUser';
import { LoadingProvider } from '../../providers/loading/loading';
import { HandlerFields } from '../../utils/HandlerFields';

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {
  public user: RegisterUser = new RegisterUser();
  public formGroup: FormGroup;
  public confirmPassward: string;
  public cpf: string = '';
  public celular: string = '';

  constructor(
    private _loadingCtrl: LoadingProvider,
    private _navCtrl: NavController,
    private _alertCtrl: AlertProvider,
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
      senha: ['', [
        CustomValidators.required
      ]],
      confirmPassward: ['', [
        CustomValidators.required,
        CustomValidators.confirmPassward
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterUserPage');
  }

  private register() {
    console.log(this.user);
    if (!this.formGroup.valid) {
      this.alertInvalidFields();
      return;
    }

    this._loadingCtrl.show({
      content: 'Cadastrando...'
    });

    this
      ._usuarioProvider
      .post(this.user)
      .subscribe(
        res => {
          console.log(res)
          this._loadingCtrl.hide();
          this.alertSuccessRegister();
        },
        err => {
          console.log(err)
          this._loadingCtrl.hide();
          this.alertNoConnection();
        }
      )
  }

  private alertNoConnection() {
    this._alertCtrl.show({
      title: 'Erro ao cadastrar',
      subTitle: 'Para se cadastrar você precisa esta conectado a internet.',
      buttons: ['OK']
    });
  }

  private alertSuccessRegister() {
    this._alertCtrl.show({
      title: 'Cadastro efetuado com sucesso!',
      subTitle: 'Verifique sua caixa de email para confirmar sua conta.',
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
      title: 'Erro ao cadastrar',
      subTitle: 'Preencha todos os campos da forma correta!',
      buttons: ['OK']
    });
  }

  private buildNascimento(event) {
    this.user.nascimento = Format.dateYMD(event.year, event.month, event.day);
  }
}
