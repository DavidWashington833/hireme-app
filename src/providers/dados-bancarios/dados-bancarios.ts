import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { RegisterBank } from '../../models/RegisterBank';

@Injectable()
export class DadosBancariosProvider {

  constructor(
    @Inject('BASE_URL') private _baseUrl: string,
    private _http: HttpClient
  ) { }

  post(user: RegisterBank) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this._http.post<RegisterBank>(`${this._baseUrl}dadosBancarios`, user, httpOption);
  }

}
