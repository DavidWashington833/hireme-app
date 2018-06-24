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
  request: RegisterRequest = new RegisterRequest();
  services: Array<ResponseService> = new Array<ResponseService>();
  selectService: ResponseService = new ResponseService();
  idPrestador = 0;

  constructor(
    private alertCtrl: AlertProvider,
    private servicoProvider: ServicoProvider,
    private pedidoProvider: PedidoProvider,
    private events: Events,
    private navParams: NavParams
  ) {
    this.idPrestador = this.navParams.get('id');
    this.servicoProvider
      .getForIdPrestador(this.idPrestador)
      .subscribe(
        res => this.services = res,
        err => console.log(err)
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailProviderPage');
  }

  setSelectService(service: ResponseService) {
    this.selectService = service;
  }

  hire(date) {
    console.log(date);

    const responseUser: ResponseUser =
      JSON.parse(localStorage.getItem('user'));

    this.request.dataPedido = Format.dateYMDHM(date.year, date.month, date.day, date.hour, date.minute);
    this.request.idPrestador = this.idPrestador;
    this.request.valorPedido = this.services.filter(s => s.idServico === this.selectService.idServico)[0].precoServico;
    this.request.idServico = Number(this.selectService.idServico);
    this.request.idUsuario = responseUser.idUsuario;
    console.log('request', JSON.stringify(this.request));
    this
      .pedidoProvider
      .post(this.request)
      .subscribe(
        res => {
          console.log(res);
          const alert = this.alertCtrl.create({
            title: 'Serviço agendado com sucesso!',
            subTitle: 'Agora você é só aguardar.',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.events.publish('service:agendado', null);
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
