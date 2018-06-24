import { Category } from './../../models/Category';
import { ServicoProvider } from './../../providers/servico/servico';
import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';

import { RegisterService } from '../../models/RegisterService';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidators } from '../../utils/CustomValidators';
import { HandlerFields } from '../../utils/HandlerFields';
import { AlertProvider } from '../../providers/alert/alert';
import { LoadingProvider } from '../../providers/loading/loading';
import { CategoriaProvider } from '../../providers/categoria/categoria';
import { ResponseProvider } from '../../models/ResponseProvider';

@IonicPage()
@Component({
  selector: 'page-register-service',
  templateUrl: 'register-service.html',
})
export class RegisterServicePage {
  categorys: Array<Category> = [];
  formGroup: FormGroup;
  service: RegisterService = new RegisterService();

  constructor(
    private _events: Events,
    private _navCtrl: NavController,
    private _alertCtrl: AlertProvider,
    private _loadingCtrl: LoadingProvider,
    private _formBuilder: FormBuilder,
    private _servicoProvider: ServicoProvider,
    private _categoriaProvider: CategoriaProvider
  ) {
    this.formGroup = this._formBuilder.group({
      descricaoServico: ['', [
        CustomValidators.required,
        CustomValidators.minLength(3),
        CustomValidators.maxLength(20)
      ]],
      precoServico: ['', [
        CustomValidators.required,
        CustomValidators.minLength(3),
        CustomValidators.maxLength(20)
      ]],
      idCategoria: ['', [
        CustomValidators.required
      ]]
    });
    this.formGroup.valueChanges.subscribe(value => HandlerFields.markAsTouchedFields(this.formGroup));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterServicePage');

    const responseProvider: ResponseProvider =
      JSON.parse(localStorage.getItem('provider'));

    this.service.idPrestador = responseProvider.idPrestador.toString();

    this._categoriaProvider
      .getAll()
      .subscribe(
        res => {
          this.categorys = res;
        },
        err => console.log(err)
      );
  }

  register() {
    console.log('dados cadastrais', this.service);
    if (!this.formGroup.valid) {
      this.alertInvalidFields();
      return;
    }

    this._loadingCtrl.show({
      content: 'Cadastrando...'
    });

    this
      ._servicoProvider
      .post(this.service)
      .subscribe(
        res => {
          console.log('resposta do cadastro', res);
          this._loadingCtrl.hide();
          this.alertSuccessRegister();
        },
        err => {
          console.error('erro no cadastro', err);
          this._loadingCtrl.hide();
          this.alertNoConnection();
        }
      );
  }

  selectCategory(event) {
    this.service.idCategoria = event;
  }

  alertNoConnection() {
    this._alertCtrl.show({
      title: 'Erro ao cadastrar',
      subTitle: 'Para cadastrar um serviço você precisa esta conectado a internet.',
      buttons: ['OK']
    });
  }

  alertSuccessRegister() {
    this._alertCtrl.show({
      title: 'Cadastro efetuado com sucesso!',
      subTitle: 'Seu serviço foi cadastrado.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this._events.publish('service:created', null);
            this._navCtrl.pop();
          }
        },
      ]
    });
  }

  alertInvalidFields() {
    this._alertCtrl.show({
      title: 'Erro ao cadastrar',
      subTitle: 'Preencha todos os campos da forma correta!',
      buttons: ['OK']
    });
  }

}
