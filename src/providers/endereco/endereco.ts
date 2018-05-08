import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { RegisterAddress } from '../../models/RegisterAddress';

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

  // get(id: number) {
  //   return this._http.get<RegisterUser>(`${this._baseUrl}usuario/${id}`);
  // }

}
