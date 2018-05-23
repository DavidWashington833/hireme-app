import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MapPage } from '../map/map';
import { RegisterService } from '../../models/RegisterService';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidators } from '../../utils/CustomValidators';
import { HandlerFields } from '../../utils/HandlerFields';

@IonicPage()
@Component({
  selector: 'page-register-service',
  templateUrl: 'register-service.html',
})
export class RegisterServicePage {
  nome: string;
  preco: string;
  descricao: string;
  formGroup: FormGroup;
  service: RegisterService = new RegisterService();

  constructor(
    private _navCtrl: NavController,
    private _formBuilder: FormBuilder,
    public navParams: NavParams
  ) {
    this.formGroup = this._formBuilder.group({
      descricaoServico: ['', [
        CustomValidators.required,
        CustomValidators.minLength(3),
        CustomValidators.maxLength(20)
      ]],
      precoServico: ['', [
        CustomValidators.required,
        CustomValidators.minLength(3),
        CustomValidators.maxLength(20)
      ]]
    });
    this.formGroup.valueChanges.subscribe(value => HandlerFields.markAsTouchedFields(this.formGroup));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterServicePage');
  }

  cadastrar() {
    this._navCtrl.pop();
  }

  register() {
    console.log(this.service);
  }

}
