import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';

import { RegisterUser } from '../../models/RegisterUser';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { CustomValidators } from '../../utils/custom-validators';

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {
  public user: RegisterUser = new RegisterUser();
  public formGroup: FormGroup;
  public confirmPassward: string;
  public cpf = '';
  public celular = '';

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
    this.formGroup.valueChanges.subscribe(value => this.markAsTouchedFields(value));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterUserPage');
  }

  register(): void {
    if (!this.formGroup.valid) {
      const alert = this._alertCtrl.create({
        title: 'Erro ao cadastrar',
        subTitle: 'Preencha todos os campos da forma correta!',
        buttons: ['OK']
      });
      alert.present();
      console.log(this.user);

      return;
    }

    const loading = this._loadingCtrl.create({
      content: 'Cadastrando...'
    });
    loading.present();

    setTimeout(() => {
      console.log(this.user);
      loading.dismiss();

      // Erro de conexão
      // const alert = this._alertCtrl.create({
      //   title: 'Erro ao cadastrar',
      //   subTitle: 'Para se cadastrar você precisa esta conectado a internet.',
      //   buttons: ['OK']
      // });
      // alert.present();

      const alert = this._alertCtrl.create({
        title: 'Cadastro efetuado com sucesso!',
        subTitle: 'Verifique sua caixa de email para confirmar sua conta.',
        buttons: [
          {
            text: 'OK',
            handler: () => { this._navCtrl.pop() }
          },
        ]
      });
      alert.present();

    }, 1000);

    // this
    //   ._usuarioProvider
    //   .post(this.user)
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
    let fields = ['nome', 'sobrenome', 'email', 'senha', 'confirmPassward','cpf', 'celular', 'nascimento'];
    fields.forEach((field) => this.formGroup.controls[field].markAsTouched());
  }

  buildNascimento(event) {
    this.user.nascimento = `${event.year}-${event.month}-${event.day}`;
  }
}
