import { AlertController, AlertOptions } from 'ionic-angular';
import { Injectable } from "@angular/core";

@Injectable()
export class AlertProvider extends AlertController {
  public show(options: AlertOptions): void {
    const alert = this.create(options);
    alert.present();
  }
}
