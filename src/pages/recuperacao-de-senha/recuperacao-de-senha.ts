import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recuperacao-de-senha',
  templateUrl: 'recuperacao-de-senha.html',
})
export class RecuperacaoDeSenhaPage {
  private email: string;

  constructor(
    private _navCtrl: NavController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperacaoDeSenhaPage');
  }

  enviar() {
    this._navCtrl.pop();
  }
}
