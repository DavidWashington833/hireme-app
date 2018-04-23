import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';

import { RegisterUser } from './../../models/RegisterUser';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { CustomValidators } from '../../utils/custom-validators';

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {
  private _user: RegisterUser = new RegisterUser();
  private _confirmPassward: string;
  private _formGroup: FormGroup;

  constructor(
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController,
    private _alertCtrl: AlertController,
    private _formBuider: FormBuilder,
    private _usuarioProvider: UsuarioProvider
  ) {
    this._formGroup = this._formBuider.group({
      nome: ['',
        CustomValidators.compose([
          CustomValidators.required,
          CustomValidators.minLength(3),
          CustomValidators.maxLength(20)
        ])],
      sobrenome: ['',
        CustomValidators.compose([
          CustomValidators.required,
          CustomValidators.minLength(3),
          CustomValidators.maxLength(20)
        ])],
      email: ['',
        CustomValidators.compose([
          CustomValidators.required,
          CustomValidators.email
        ])
      ],
      senha: ['',
        CustomValidators.compose([
          CustomValidators.required
        ])
      ],
      confirmPassward: ['',
        CustomValidators.compose([
          CustomValidators.required,
          CustomValidators.confirmPassward
        ])
      ],
      cpf: ['',
        CustomValidators.compose([
          CustomValidators.required,
          CustomValidators.cpf
        ])
      ],
      celular: ['',
        CustomValidators.compose([
          CustomValidators.required,
          CustomValidators.tel
        ])
      ],
      nascimento: ['', CustomValidators.required]
    });
  }

  ionViewDidLoad() {}

  register(): void {
    if (!this._formIsValid()) {
      const alert = this._alertCtrl.create({
        title: 'Erro ao cadastrar',
        subTitle: 'Preencha todos os campos da forma correta!',
        buttons: ['OK']
      });
      alert.present();
      console.log(this._user);

      return;
    }

    const loading = this._loadingCtrl.create({
      content: 'Cadastrando...'
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();
      console.log(this._user);
    }, 500);

    // this
    //   ._usuarioProvider
    //   .post(this._user)
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

  buildNascimento(event) {
    this._user.nascimento = `${event.year}-${event.month}-${event.day}`;
  }

  private _formIsValid(): boolean {
    return this._formGroup.status == 'VALID';
  }

}
