import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DetailServicePage } from '../detail-service/detail-service';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  public text: string;

  constructor(
    private _navCtrl: NavController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  onCancel(event: Event) {}
  onInput(event: Event) {}

  goServiceDetail() {
    this._navCtrl.push(DetailServicePage.name);
  }
}
