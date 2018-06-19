import { ResponseProvider } from './../../models/ResponseProvider';
import { RegisterProvider } from './../../models/RegisterProvider';
import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';

import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidators } from '../../utils/CustomValidators';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { EnderecoProvider } from '../../providers/endereco/endereco';
import { ResponseUser } from '../../models/ResponseUser';
import { ResponseAddress } from '../../models/ReponseAddress';
import { PrestadorProvider } from '../../providers/prestador/prestador';
import { DadosBancariosProvider } from '../../providers/dados-bancarios/dados-bancarios';
import { RegisterBank } from '../../models/RegisterBank';
import { RegisterAddressPage } from '../register-address/register-address';

@IonicPage()
@Component({
  selector: 'page-register-provider',
  templateUrl: 'register-provider.html',
})
export class RegisterProviderPage {
  public documento = '';
  public formGroup: FormGroup;
  public registerProvider: RegisterProvider = new RegisterProvider();
  public dadosBancarios: RegisterBank = new RegisterBank();
  public enderecos: ResponseAddress[];

  constructor(
    private _navCtrl: NavController,
    private _formBuilder: FormBuilder,
    private _loadingCtrl: LoadingProvider,
    private _alertCtrl: AlertProvider,
    private _enderecoProvider: EnderecoProvider,
    private _prestadorProvider: PrestadorProvider,
    private _dadosBancariosProvider: DadosBancariosProvider,
    private _events: Events
  ) {
    this._events.subscribe('address:created', () => {
      this.getAddress();
    });
    this.formGroup = this._formBuilder.group({
      agencia: ['', [
        CustomValidators.required
      ]],
      conta: ['', [
        CustomValidators.required
      ]],
      documento: ['', [
        CustomValidators.required
      ]],
      endereco: ['', [
        CustomValidators.required
      ]]
    });
    this.formGroup.valueChanges.subscribe(() => this.markAsTouchedFields());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterProviderPage');
    this.getAddress();
  }

  private getAddress() {
    const responseUser: ResponseUser =
      JSON.parse(localStorage.getItem('user'));

    this._loadingCtrl.show({ content: 'Buscando dados do usuário...' });
    this._enderecoProvider
      .getForUsuario(responseUser.idUsuario)
      .subscribe(res => {
        this.enderecos = res;
        this._loadingCtrl.hide();
      }, err => {
        this._loadingCtrl.hide();
      });
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

    const endereco: ResponseAddress = this.enderecos
      .filter(e => e.idEndereco.toString() === this.registerProvider.endereco)[0];

    this.registerProvider.latitudePrestador = endereco.latitudeEndereco;
    this.registerProvider.longitudePrestador = endereco.longitudeEndereco;

    this._loadingCtrl.show({
      content: 'Cadastrando...'
    });

    console.log(this.dadosBancarios);
    this
      ._dadosBancariosProvider
      .post(this.dadosBancarios)
      .subscribe(
        res => {
          console.log('resposta do cadastro', res);
          const responseUser: ResponseUser =
            JSON.parse(localStorage.getItem('user'));

          this.registerProvider.usuario = responseUser.idUsuario.toString();
          this.registerProvider.dadosBancarios = res.idDadosBancario.toString();

          console.log('-------------------> registerProvider', JSON.stringify(this.registerProvider));
          this._prestadorProvider
            .post(this.registerProvider)
            .subscribe(ress => {
              this.isProvider(ress);
              this._loadingCtrl.hide();
              // this.alertSuccessRegister();
              const alert = this._alertCtrl.create({
                title: 'Cadastro efetuado com sucesso!',
                subTitle: 'Agora você é um prestador.',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      this._navCtrl.pop();
                      this._prestadorProvider
                      // .getForUser(1)
                        .getForUser(Number(this.registerProvider.usuario))
                        .subscribe(
                          resss => {
                            console.log('resposta ao buscar prestador', resss);
                            localStorage.setItem('provider', JSON.stringify(resss));
                            this.isProvider(resss);
                          },
                          err => {
                            console.error('erro ao buscar prestador', err);
                            this.isProvider(null);
                          });
                    }
                  },
                ]
              });
              alert.present();
            }, err => {
              console.log(err);
              this.registerError();
            });
          },
          err => {
            console.error('erro no cadastro', err);
            this._loadingCtrl.hide();
            this.registerError();
          });
  }

  private isProvider(v: ResponseProvider) {
    this._events.publish('provider:load', v);
  }

  private registerError() {
    const alert = this._alertCtrl.create({
      title: 'Erro ao cadastrar',
      subTitle: 'Para se cadastrar você precisa esta conectado a internet.',
      buttons: ['OK']
    });
    alert.present();
  }

  segmentChanged(event) {
    console.log(event);
  }

  markAsTouchedFields() {
    const fields = ['agencia', 'conta', 'documento'];
    fields.forEach((field) => this.formGroup.controls[field].markAsTouched());
  }

  registerAddress() {
    this._navCtrl.push(RegisterAddressPage.name);
  }
}
