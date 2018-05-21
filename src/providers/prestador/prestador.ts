import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { ResponseProvider } from '../../models/ResponseProvider';
import { RegisterProvider } from '../../models/RegisterProvider';

@Injectable()
export class PrestadorProvider {
  private _httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(
    @Inject('BASE_URL') private _baseUrl: string,
    private _http: HttpClient
  ) {}

  getForId(id: number) {
    return this._http.get<ResponseProvider>(`${this._baseUrl}prestador?idPrestador=${id}`);
  }

  getForUser(id: number) {
    return this._http.get<ResponseProvider>(`${this._baseUrl}prestador?idUsuario=${id}`);
  }

  post(provider: RegisterProvider) {
    console.log(this._baseUrl);
    return this._http.post<ResponseProvider>(`${this._baseUrl}prestador`, provider, this._httpOption);
  }

  getForCoords(latitude: number, longitude: number) {
    let lat = latitude.toString().replace('.', '').split('');
    let lon = longitude.toString().replace('.', '').split('');
    return this._http.get<ResponseProvider[]>(`${this._baseUrl}prestador?lat=${lat.splice(0, lat.length - 1)}&lon=${lon.splice(0, lon.length - 1)}`);
  }

}
