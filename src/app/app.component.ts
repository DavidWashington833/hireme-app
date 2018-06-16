import { Component, ViewChild } from '@angular/core';
import { Nav, Events } from 'ionic-angular';

import { LoginPage } from './../pages/login/login';
import { DetailUserPage } from './../pages/detail-user/detail-user';
import { ResponseUser } from './../models/ResponseUser';
import { RegisterProviderPage } from '../pages/register-provider/register-provider';
import { SchedulePage } from '../pages/schedule/schedule';
import { ListServicePage } from '../pages/list-service/list-service';
import { RequestPage } from '../pages/request/request';
import { ResponseProvider } from '../models/ResponseProvider';
import { ItemPage } from '../models/ItemPage';
import { UserStorageProvider } from '../providers/user-storage/user-storage';

@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  @ViewChild(Nav)
  nav: Nav;
  rootPage: any = LoginPage;
  user = { fullName: '', email: '' };
  pages: Array<ItemPage> = [];
  providerPages: Array<ItemPage>;
  userPages: Array<ItemPage>;

  constructor(
    private events: Events,
    private userStorageProvider: UserStorageProvider
  ) {
    this.providerPages = [
      { title: 'Meus dados', component: DetailUserPage.name, icon: 'person' },
      { title: 'Meus pedidos', component: RequestPage.name, icon: 'cart' },
      { title: 'Agenda', component: SchedulePage.name, icon: 'calendar' },
      { title: 'Servico', component: ListServicePage.name, icon: 'paper' }
    ];
    this.userPages = [
      { title: 'Meus dados', component: DetailUserPage.name, icon: 'person' },
      { title: 'Meus pedidos', component: RequestPage.name, icon: 'cart' },
      { title: 'Quero trabalhar', component: RegisterProviderPage.name, icon: 'briefcase' },
    ];

    this.events.subscribe('user:load', (user: ResponseUser) => this.setHeader(user));
    this.events.subscribe('user:update', (user: ResponseUser) => this.setHeader(user));
    this.events.subscribe('provider:load', (provider: ResponseProvider) => this.setMenu(provider));
  }

  setMenu(provider: ResponseProvider) {
    this.pages = provider ? this.providerPages : this.userPages;
  }

  setHeader(user: ResponseUser) {
    const { nomeUsuario, sobrenomeUsuario, emailUsuario } = user;
    this.setUser(nomeUsuario, sobrenomeUsuario, emailUsuario);
  }

  setUser(nomeUsuario: string, sobrenomeUsuario: string, emailUsuario: string) {
    this.user.fullName = `${nomeUsuario} ${sobrenomeUsuario}`;
    this.user.email = emailUsuario;
  }

  openPage(page) {
    this.nav.push(page.component);
  }

  logout() {
    this.userStorageProvider.removeUserAndProvider();

    this.user.email = '';
    this.user.fullName = '';
    this.nav.setRoot(LoginPage);
  }
}
