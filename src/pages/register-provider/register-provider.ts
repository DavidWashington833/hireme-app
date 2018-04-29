import { RegisterProvider } from './../../models/RegisterProvider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { RegisteredProviderPage } from '../registered-provider/registered-provider';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidators } from '../../utils/custom-validators';

@IonicPage()
@Component({
  selector: 'page-register-provider',
  templateUrl: 'register-provider.html',
})
export class RegisterProviderPage {
  public documento: string = '';
  public formGroup: FormGroup;
  public registerProvider: RegisterProvider = new RegisterProvider();

  constructor(
    private _navCtrl: NavController,
    private _formBuilder: FormBuilder,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController
  ) {
    this.formGroup = this._formBuilder.group({
      agencia: ['', [
        CustomValidators.required
      ]],
      conta: ['', [
        CustomValidators.required
      ]],
      documento: ['', [
        CustomValidators.required
      ]]
    });
    this.formGroup.valueChanges.subscribe(value => this.markAsTouchedFields(value));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterProviderPage');
  }

  register() {
    if (!this.formGroup.valid) {
      const alert = this._alertCtrl.create({
        title: 'Erro ao cadastrar',
        subTitle: 'Preencha todos os campos da forma correta!',
        buttons: ['OK']
      });
      alert.present();
      console.log(this.registerProvider);

      return;
    }

    const loading = this._loadingCtrl.create({
      content: 'Cadastrando...'
    });
    loading.present();

    setTimeout(() => {
      console.log(this.registerProvider);
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
        subTitle: 'Agora você é um prestador.',
        buttons: [
          {
            text: 'OK',
            handler: () => { this._navCtrl.pop() }
          },
        ]
      });
      alert.present();

    }, 1000);
  }

  segmentChanged(event) {
    console.log(event);
  }

  markAsTouchedFields(value: Object) {
    let fields = ['agencia', 'conta', 'documento'];
    fields.forEach((field) => this.formGroup.controls[field].markAsTouched());
  }
}
