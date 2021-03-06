import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { RegisterAddress } from '../../models/RegisterAddress';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from '../../utils/CustomValidators';
import { HandlerFields } from '../../utils/HandlerFields';
import { EnderecoProvider } from '../../providers/endereco/endereco';
import { ResponseUser } from '../../models/ResponseUser';
import { GMapsServiceProvider } from '../../providers/g-maps-service/g-maps-service';

@IonicPage()
@Component({
  selector: 'page-register-address',
  templateUrl: 'register-address.html',
})
export class RegisterAddressPage {
  public address: RegisterAddress = new RegisterAddress();
  public formGroup: FormGroup;

  constructor(
    private _navCtrl: NavController,
    private _loadingCtrl: LoadingProvider,
    private _alertCtrl: AlertProvider,
    private _formBuilder: FormBuilder,
    private _enderecoProvider: EnderecoProvider,
    private _events: Events,
    private _GMaps: GMapsServiceProvider
  ) {
    this.formGroup = this._formBuilder.group({
      rua: ['', [
        CustomValidators.required,
        CustomValidators.minLength(3),
        CustomValidators.maxLength(50)
      ]],
      complemento: ['', [
        CustomValidators.required,
        CustomValidators.minLength(3),
        CustomValidators.maxLength(20)
      ]],
      estado: ['', [
        CustomValidators.required,
        CustomValidators.minLength(2),
        CustomValidators.maxLength(20)
      ]],
      cidade: ['', [
        CustomValidators.required,
        CustomValidators.minLength(2),
        CustomValidators.maxLength(20)
      ]],
      numero: ['', [
        CustomValidators.required,
        CustomValidators.minLength(2),
        CustomValidators.maxLength(20)
      ]],
      cep: ['', [
        CustomValidators.required,
        CustomValidators.minLength(3),
        CustomValidators.maxLength(20)
      ]]
    });
    this.formGroup.valueChanges.subscribe(value => HandlerFields.markAsTouchedFields(this.formGroup));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterAddressPage');
    const user: ResponseUser = JSON.parse(localStorage.getItem('user'));
    this.address.idUsuario = user.idUsuario;
  }

  register() {
    console.log(this.address);
    if (!this.formGroup.valid) {
      this.alertInvalidFields();
      return;
    }

    this._loadingCtrl.show({
      content: 'Cadastrando...'
    });

    this.address.logradouro = 'logradouro';

    this._GMaps.getLatLan(`${this.address.rua} ${this.address.numero}`)
      .subscribe(
        res => {
          this.address.longitudeEndereco = parseFloat(res.lng()).toFixed(6);
          this.address.latitudeEndereco = parseFloat(res.lat()).toFixed(6);

          console.log(this.address);

          this
          ._enderecoProvider
          .post(this.address)
          .subscribe(
            () => {
              this._loadingCtrl.hide();
              this.alertSuccessRegister();
            },
            err => {
              this._loadingCtrl.hide();
              this.alertNoConnection();
              console.log(err);
            }
          );
        },
        err => this.addressNotFound()
      );

  }

  private alertNoConnection() {
    this._alertCtrl.show({
      title: 'Erro ao cadastrar endereco',
      subTitle: 'Para cadastrar um endereço você precisa esta conectado a internet.',
      buttons: ['OK']
    });
  }

  private addressNotFound() {
    this._alertCtrl.show({
      title: 'Erro ao cadastrar endereco',
      subTitle: 'Endereco não encontrado.',
      buttons: ['OK']
    });
  }

  private alertSuccessRegister() {
    this._alertCtrl.show({
      title: 'Endereço cadastrado com sucesso',
      subTitle: 'Seu endereço foi cadastrado.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this._events.publish('address:created', null);
            this._navCtrl.pop();
          }
        },
      ]
    });
  }

  private alertInvalidFields() {
    this._alertCtrl.show({
      title: 'Erro ao cadastrar endereco',
      subTitle: 'Preencha todos os campos da forma correta!',
      buttons: ['OK']
    });
  }

}
