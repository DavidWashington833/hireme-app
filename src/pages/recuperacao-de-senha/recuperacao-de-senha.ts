import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RecuperacaoDeSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperacao-de-senha',
  templateUrl: 'recuperacao-de-senha.html',
})
export class RecuperacaoDeSenhaPage {
  private email: string;

  constructor(
    private _navCtrl: NavController,
    private _navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperacaoDeSenhaPage');
  }

  enviar() {
    this._navCtrl.pop();
  }
}
