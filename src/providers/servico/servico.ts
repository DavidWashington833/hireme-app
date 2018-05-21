import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { RegisterService } from '../../models/RegisterService';

@Injectable()
export class ServicoProvider {
  private _httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(
    @Inject('BASE_URL') private _baseUrl: string,
    private _http: HttpClient
  ) {}

  post(service: RegisterService) {
    console.log(this._baseUrl);
    return this._http.post<RegisterService>(`${this._baseUrl}servicos`, service, this._httpOption);
  }

}
