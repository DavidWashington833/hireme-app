import { RegisterServicePage } from './../register-service/register-service';
import { DetailServicePage } from './../detail-service/detail-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list-service',
  templateUrl: 'list-service.html',
})
export class ListServicePage {

  constructor(
    private _navCtrl: NavController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListServicePage');
  }

  detalheServico() {
    this._navCtrl.push(DetailServicePage.name);
  }

  cadastrar() {
    this._navCtrl.push(RegisterServicePage.name);
  }

}
