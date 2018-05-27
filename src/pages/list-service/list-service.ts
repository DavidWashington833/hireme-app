import { ServicoProvider } from './../../providers/servico/servico';
import { RegisterServicePage } from '../register-service/register-service';
import { DetailServicePage } from '../detail-service/detail-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResponseProvider } from '../../models/ResponseProvider';
import { ResponseService } from '../../models/ResponseService';

@IonicPage()
@Component({
  selector: 'page-list-service',
  templateUrl: 'list-service.html',
})
export class ListServicePage {
  private services: Array<ResponseService> = new Array<ResponseService>();

  constructor(
    private _navCtrl: NavController,
    private _servicoProvider: ServicoProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListServicePage');

    const responseProvider: ResponseProvider =
      JSON.parse(localStorage.getItem('provider'));

    const id = responseProvider.idPrestador.toString();

    this._servicoProvider
      .getForIdPrestador(id)
      .subscribe(
        res => {
          this.services = res;
          console.log(res)
        },
        err => console.log(err)
      );
  }

  detalheServico() {
    this._navCtrl.push(DetailServicePage.name);
  }

  cadastrar() {
    this._navCtrl.push(RegisterServicePage.name);
  }

}
