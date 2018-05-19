import { ResponseUser } from './../../models/ResponseUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { Login } from '../../models/login';
import { RegisterUser } from '../../models/RegisterUser';

@Injectable()
export class LoginProvider {
  private _httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(
    @Inject('BASE_URL') private _baseUrl: string,
    private _http: HttpClient
  ) { }

  post(user: Login) {
    console.log(this._baseUrl);
    return this._http.post<ResponseUser>(`${this._baseUrl}login`, user, this._httpOption);
  }
}
