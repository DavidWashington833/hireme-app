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

  getForCoords(latitude: number, longitude: number) {
    let lat = latitude.toString().replace('.', '').split('');
    let lon = longitude.toString().replace('.', '').split('');
    return this._http.get<ResponseProvider[]>(`${this._baseUrl}prestador?lat=${lat.splice(0, lat.length - 1)}&lon=${lon.splice(0, lon.length - 1)}`);
  }

}
