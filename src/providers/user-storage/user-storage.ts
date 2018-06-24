  import { Injectable } from '@angular/core';
import { ResponseUser } from '../../models/ResponseUser';
import { ResponseProvider } from '../../models/ResponseProvider';

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

  setUser(user: ResponseUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  setProvider(provider: ResponseProvider): void {
    localStorage.setItem('provider', JSON.stringify(provider));
  }

}
