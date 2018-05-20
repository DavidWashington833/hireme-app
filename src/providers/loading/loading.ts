import { Injectable } from '@angular/core';
import { Loading, LoadingController, LoadingOptions } from 'ionic-angular';

@Injectable()
export class LoadingProvider extends LoadingController {
  private _loading: Loading;

  public show(options: LoadingOptions): void {
    this._loading = this.create(options);
    this._loading.present();
  }

  public hide(): void {
    this._loading.dismiss();
  }
}
