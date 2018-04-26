import { RegisterServicePage } from './../register-service/register-service';
import { ServiceDetailPage } from './../service-detail/service-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lista-servico',
  templateUrl: 'lista-servico.html',
})
export class ListaServicoPage {

  constructor(
    private _navCtrl: NavController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaServicoPage');
  }

  detalheServico() {
    this._navCtrl.push(ServiceDetailPage.name);
  }

  cadastrar() {
    this._navCtrl.push(RegisterServicePage.name);
  }

}
