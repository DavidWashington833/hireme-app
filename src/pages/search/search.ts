import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DetailServicePage } from '../detail-service/detail-service';
import { ServicoProvider } from '../../providers/servico/servico';
import { ResponseService } from '../../models/ResponseService';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  text: string;
  services: Array<ResponseService> = [];

  constructor(
    private navCtrl: NavController,
    private serviceProvider: ServicoProvider
  ) {}

  ionViewDidLoad() {
    this.serviceProvider
      .get()
      .subscribe(
        services => this.services = services,
        err => console.log(err)
      );
  }

  onCancel(event: Event) {}
  onInput(event: Event) {}

  goServiceDetail() {
    this.navCtrl.push(DetailServicePage.name);
  }
}
