import { EditUser } from './../../models/EditUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { RegisterUser } from '../../models/RegisterUser';
import { ResponseUser } from '../../models/ResponseUser';

@Injectable()
export class UsuarioProvider {
  private _httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(
    @Inject('BASE_URL') private _baseUrl: string,
    private _http: HttpClient
  ) {}

  post(user: RegisterUser) {
    console.log(this._baseUrl);
    return this._http.post<RegisterUser>(`${this._baseUrl}usuario`, user, this._httpOption);
  }

  get(id: number) {
    return this._http.get<ResponseUser>(`${this._baseUrl}usuario/${id}`);
  }

  put(id: number, user: EditUser) {
    return this._http.put<ResponseUser>(`${this._baseUrl}usuario/${id}`, this._httpOption);
  }

}
