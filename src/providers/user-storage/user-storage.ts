import { Injectable } from '@angular/core';
import { ResponseUser } from '../../models/ResponseUser';

@Injectable()
export class UserStorageProvider {

  isLogged(): boolean {
    return localStorage.getItem('user') != null && localStorage.getItem('user') !== 'null';
  }

  removeUserAndProvider(): void {
    this.removeUser();
    this.removeProvider();
  }

  removeUser(): void {
    localStorage.removeItem('user');
  }

  removeProvider(): void {
    localStorage.removeItem('provider');
  }

  getUser(): ResponseUser {
    return <ResponseUser>JSON.parse(localStorage.getItem('user'));
  }

}
