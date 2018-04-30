import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { RegisterUser } from '../../models/RegisterUser';

@Injectable()
export class UsuarioProvider {

  constructor(
    @Inject('BASE_URL') private _baseUrl: string,
    private _http: HttpClient
  ) {}

  post(user: RegisterUser) {
    console.log(this._baseUrl);
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this._http.post<RegisterUser>(`${this._baseUrl}usuario`, user, httpOption);
  }

  get(id: number) {
    return this._http.get<RegisterUser>(`${this._baseUrl}usuario/${id}`);
  }

}
