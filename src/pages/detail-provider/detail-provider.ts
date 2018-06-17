import { Component } from '@angular/core';
import { IonicPage, NavParams, Events } from 'ionic-angular';
import { ResponseService } from '../../models/ResponseService';
import { ServicoProvider } from '../../providers/servico/servico';
import { RegisterRequest } from '../../models/RegisterRequest';
import { ResponseUser } from '../../models/ResponseUser';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { Format } from '../../utils/Format';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-detail-provider',
  templateUrl: 'detail-provider.html',
})
export class DetailProviderPage {
  public request: RegisterRequest = new RegisterRequest();
  public services: Array<ResponseService> = new Array<ResponseService>();
  public idPrestador = 0;

  constructor(
    private _alertCtrl: AlertProvider,
    private _servicoProvider: ServicoProvider,
    private _pedidoProvider: PedidoProvider,
    private _events: Events,
    private _navParams: NavParams
  ) {
    this.idPrestador = this._navParams.get('id');
    this._servicoProvider
      .getForIdPrestador(this.idPrestador)
      .subscribe(
        res => this.services = res,
        err => console.log(err)
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailProviderPage');
  }

  hire(date) {
    console.log(date);

    const responseUser: ResponseUser =
      JSON.parse(localStorage.getItem('user'));

    this.request.dataPedido = Format.dateYMDHM(date.year, date.month, date.day, date.hour, date.minute);
    this.request.idPrestador = this.idPrestador;
    this.request.valorPedido = this.services.filter(s => s.idServico === this.request.idServico.toString())[0].precoServico;
    this.request.idUsuario = responseUser.idUsuario;
    console.log('request', this.request);
    this
      ._pedidoProvider
      .post(this.request)
      .subscribe(
        res => {
          console.log(res);
          const alert = this._alertCtrl.create({
            title: 'Serviço agendado com sucesso!',
            subTitle: 'Agora você é só aguardar.',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this._events.publish('service:agendado', null);
                }
              },
            ]
          });
          alert.present();
        },
        err => console.log(err)
      );
  }
}
