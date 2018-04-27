import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detail-provider',
  templateUrl: 'detail-provider.html',
})
export class DetailProviderPage {
  public idPrestador: number = 0;

  constructor(
    private _navParams: NavParams
  ) {
    this.idPrestador = this._navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailProviderPage');
  }

}
