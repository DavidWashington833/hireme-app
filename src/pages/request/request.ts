import { ResponseRequest } from './../../models/ResponseRequest';
import { DetailRequestPage } from '../detail-request/detail-request';
import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { ResponseUser } from '../../models/ResponseUser';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { ServicoProvider } from '../../providers/servico/servico';
import { RequestJoinService } from '../../models/RequestJoinService';
import { Format } from '../../utils/Format';

@IonicPage()
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {
  private requests: Array<ResponseRequest> = new Array<ResponseRequest>();
  private requestJoinServices: Array<RequestJoinService> = new Array<RequestJoinService>();

  constructor(
    private _navCtrl: NavController,
    private _pedidoProvider: PedidoProvider,
    private _events: Events,
    private _servicoProvider: ServicoProvider
  ) {

    this._events.subscribe('service:agendado', () => {
      this.getRequests();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');

    this.getRequests();
  }

  private getRequests() {
    const responseUser: ResponseUser = JSON.parse(localStorage.getItem('user'));
    this._pedidoProvider
      .getForUser(responseUser.idUsuario)
      .subscribe(res => {
        this.requests = res;
        this.requests.forEach(r => {
          this._servicoProvider
            .getForId(r.idServico)
            .subscribe(s => {
              const rs = new RequestJoinService();
              const date = new Date(r.dataPedido);
              rs.confirmadoPedido = r.confirmadoPedido;
              rs.dataPedido = Format
                .dateYMDHM(
                  date.getFullYear().toString(),
                  date.getMonth().toString(),
                  date.getDay().toString(),
                  date.getHours().toString(),
                  date.getMinutes().toString()
                );
              rs.descricaoServico = s.descricaoServico;
              rs.idCategoria = s.idCategoria;
              rs.idPedido = r.idPedido;
              rs.idPrestador = r.idPrestador;
              rs.idServico = r.idServico;
              rs.idUsuario = r.idUsuario;
              rs.precoServico = r.valorPedido;
              rs.statusPedido = r.statusPedido;
              rs.valorPedido = r.valorPedido;
              this.requestJoinServices.push(rs);
            }, err => console.log(err));
        });
      }, err => console.log(err));
  }

  detalhePedido() {
    this._navCtrl.push(DetailRequestPage.name);
  }

}
