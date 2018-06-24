import { Component } from '@angular/core';
import { IonicPage, Events } from 'ionic-angular';
import { ServicoProvider } from '../../providers/servico/servico';
import { ResponseService } from '../../models/ResponseService';
import { RegisterRequest } from '../../models/RegisterRequest';
import { ResponseUser } from '../../models/ResponseUser';
import { Format } from '../../utils/Format';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  request: RegisterRequest = new RegisterRequest();
  textSearch: string;
  services: Array<ResponseService> = [];
  servicesFilter: Array<ResponseService> = [];
  selectService: ResponseService = new ResponseService();

  constructor(
    private alertCtrl: AlertProvider,
    private events: Events,
    private pedidoProvider: PedidoProvider,
    private serviceProvider: ServicoProvider
  ) {}

  ionViewDidLoad() {
    this.serviceProvider
      .get()
      .subscribe(
        services => {
          this.services = services;
          this.servicesFilter = services;
        },
        err => console.log(err)
      );
  }

  setSelectService(service: ResponseService) {
    this.selectService = service;
  }

  hire(date) {
    console.log(date);

    const responseUser: ResponseUser =
      JSON.parse(localStorage.getItem('user'));

    this.request.dataPedido = Format.dateYMDHM(date.year, date.month, date.day, date.hour, date.minute);
    this.request.idPrestador = Number(this.selectService.idPrestador);
    this.request.valorPedido = this.selectService.precoServico;
    this.request.idUsuario = responseUser.idUsuario;
    this.request.idServico = Number(this.selectService.idServico);
    console.log('request', this.request);
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

  onCancel() {
    this.textSearch = '';
  }

  onInput() {
    this.servicesFilter =
      this.services
        .filter(s =>
          s.descricaoServico
            .toUpperCase()
            .includes(this.textSearch.toUpperCase())
        );
  }
}
