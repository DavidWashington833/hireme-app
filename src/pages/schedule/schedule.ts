import { DetailRequestPage } from '../detail-request/detail-request';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

  constructor(
    private _navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }

  detailRequest() {
    this._navCtrl.push(DetailRequestPage.name);
  }
}
