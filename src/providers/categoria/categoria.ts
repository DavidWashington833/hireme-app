import { Category } from './../../models/Category';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class CategoriaProvider {

  constructor(
    @Inject('BASE_URL') private _baseUrl: string,
    private _http: HttpClient
  ) { }

  public getAll() {
    return this._http.get<Category[]>(`${this._baseUrl}categoria`);
  }

}
