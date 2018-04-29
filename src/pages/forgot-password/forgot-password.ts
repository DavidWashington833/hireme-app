import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from '../../utils/custom-validators';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  public email: string;
  public formGroup: FormGroup;

  constructor(
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _formBuilder: FormBuilder,
    private _navCtrl: NavController
  ) {
    this.formGroup = this._formBuilder.group({
      email: ['', [
        CustomValidators.required,
        CustomValidators.email
      ]]
    });
    this.formGroup.valueChanges.subscribe(value => this.markAsTouchedFields(value));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  send() {
    const loading = this._loadingCtrl.create({
      content: 'Enviando email de recuperação...'
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();

      // Em caso de recuperação
      // const alert = this._alertCtrl.create({
      //   title: 'Erro na recuperação',
      //   subTitle: 'Email não encontrado!',
      //   buttons: ['OK']
      // });
      // alert.present();

      // this._navCtrl.pop();
    }, 1000);
  }

  markAsTouchedFields(value: Object) {
    let fields = ['email'];
    fields.forEach((field) => this.formGroup.controls[field].markAsTouched());
  }
}
