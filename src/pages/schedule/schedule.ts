import { ResponseProvider } from './../../models/ResponseProvider';
import { DetailRequestPage } from '../detail-request/detail-request';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { ResponseRequest } from '../../models/ResponseRequest';
import { RequestJoinService } from '../../models/RequestJoinService';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { ServicoProvider } from '../../providers/servico/servico';
import { ResponseUser } from '../../models/ResponseUser';
import { Format } from '../../utils/Format';

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  private requests: Array<ResponseRequest> = new Array<ResponseRequest>();
  private requestJoinServices: Array<RequestJoinService> = new Array<RequestJoinService>();

  constructor(
    private _navCtrl: NavController,
    private _navParams: NavParams,
    private _pedidoProvider: PedidoProvider,
    private _servicoProvider: ServicoProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');

    const responseProvider: ResponseProvider =
      JSON.parse(localStorage.getItem('provider'));

    this._pedidoProvider
      .getForProvider(responseProvider.idPrestador)
      .subscribe(
        res => {
          this.requests = res;

          this.requests.forEach(r => {
            this._servicoProvider
              .get(r.idServico)
              .subscribe(
                s => {
                  let rs = new RequestJoinService();
                  let date = new Date(r.dataPedido);

                  rs.confirmadoPedido = r.confirmadoPedido;
                  rs.dataPedido = Format.dateYMDHM(date.getFullYear().toString(), date.getMonth().toString(), date.getDay().toString(), date.getHours().toString(), date.getMinutes().toString());
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
                },
                err => console.log(err)
              )
          });
        },
        err => console.log(err)
      );
  }

  confirm(id: number) {
    let request: ResponseRequest = this.requests.filter(r => r.idPedido == id)[0];
    request.confirmadoPedido = true;

    this._pedidoProvider
      .confirmRequest(request)
      .subscribe(
        res => {
          console.log(res);
          this.requestJoinServices = this.requestJoinServices.map(rs => {
            if(rs.idPedido == res.idPedido) {
              rs.confirmadoPedido = res.confirmadoPedido;
            }
            return rs;
          })
        },
        err => console.log(err)
      );
  }

  detailRequest() {
    this._navCtrl.push(DetailRequestPage.name);
  }
}
