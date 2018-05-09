import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { ResponseProvider } from '../../models/ResponseProvider';

@Injectable()
export class PrestadorProvider {

  constructor(
    @Inject('BASE_URL') private _baseUrl: string,
    private _http: HttpClient
  ) {}

  get(id: number) {
    return this._http.get<ResponseProvider>(`${this._baseUrl}prestador?idPrestador=${id}`);
  }

}
