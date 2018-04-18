import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  public text: string;

  constructor() {}

  ionViewDidLoad() {}

  onCancel(event: Event) {}
  onInput(event: Event) {}
}
