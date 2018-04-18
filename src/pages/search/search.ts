import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ServiceDetailPage } from './../service-detail/service-detail';

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

  ionViewDidLoad() {}

  onCancel(event: Event) {}
  onInput(event: Event) {}

  goServiceDetail() {
    this._navCtrl.push(ServiceDetailPage.name);
  }
}
