import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { ResponseService } from '../../models/ResponseService';
import { ServicoProvider } from '../../providers/servico/servico';
import { ResponseProvider } from '../../models/ResponseProvider';

@IonicPage()
@Component({
  selector: 'page-detail-provider',
  templateUrl: 'detail-provider.html',
})
export class DetailProviderPage {
  private services: Array<ResponseService> = new Array<ResponseService>();
  public idPrestador: number = 0;

  constructor(
    private _navCtrl: NavController,
    private _servicoProvider: ServicoProvider,
    private _navParams: NavParams
  ) {
    this.idPrestador = this._navParams.get('id');
    this._servicoProvider
      .getForIdPrestador(this.idPrestador)
      .subscribe(
        res => {
          this.services = res;
          console.log(res)
        },
        err => console.log(err)
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailProviderPage');
  }

  hire(id) {
    console.log(id);
  }
}
