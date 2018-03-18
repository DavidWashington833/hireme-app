import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PrestadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'detalhe-do-prestador',
  templateUrl: 'detalhe-do-prestador.html',
})
export class DetalheDoPrestadorPage {
  public idPrestador: number = 0;

  constructor(
    private _navCtrl: NavController,
    private _navParams: NavParams
  ) {
    this.idPrestador = this._navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrestadorPage');
  }

}
