import { RegisterRequest } from './../../models/RegisterRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { ResponseRequest } from '../../models/ResponseRequest';

@Injectable()
export class PedidoProvider {
  private _httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(
    @Inject('BASE_URL') private _baseUrl: string,
    private _http: HttpClient
  ) {}

  post(request: RegisterRequest) {
    return this._http.post<ResponseRequest>(`${this._baseUrl}pedido`, request, this._httpOption);
  }

}
