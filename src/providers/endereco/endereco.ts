import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { RegisterAddress } from '../../models/RegisterAddress';
import { ResponseAddress } from '../../models/ReponseAddress';

@Injectable()
export class EnderecoProvider {

  constructor(
    @Inject('BASE_URL') private _baseUrl: string,
    private _http: HttpClient
  ) { }

  post(user: RegisterAddress) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this._http.post<RegisterAddress>(`${this._baseUrl}endereco`, user, httpOption);
  }

  getForUsuario(id: number) {
    return this._http.get<ResponseAddress[]>(`${this._baseUrl}endereco/usuario/${id}`);
  }

}
