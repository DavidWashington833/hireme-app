import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'detalhe-do-prestador',
  templateUrl: 'detalhe-do-prestador.html',
})
export class DetalheDoPrestadorPage {
  public idPrestador: number = 0;

  constructor(
    private _navParams: NavParams
  ) {
    this.idPrestador = this._navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrestadorPage');
  }

}
