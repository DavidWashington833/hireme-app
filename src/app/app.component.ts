import { LoginPage } from './../pages/login/login';
import { DetailUserPage } from './../pages/detail-user/detail-user';
import { ResponseUser } from './../models/ResponseUser';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MapPage } from '../pages/map/map';
import { RegisterProviderPage } from '../pages/register-provider/register-provider';
import { SchedulePage } from '../pages/schedule/schedule';
import { ListServicePage } from '../pages/list-service/list-service';
import { RequestPage } from '../pages/request/request';

@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  public userName: string = '';
  public userEmail: string = '';
  public userInitials: string = '';

  @ViewChild(Nav)
  private _nav: Nav;
  private _pages: Array<{ title: string, component: any, icon: string }> = [];
  private _rootPage: any = LoginPage;

  public get pages() {
    return this._pages;
  }

  public get rootPage() {
    return this._rootPage;
  }

  constructor(
    private _events: Events
  ) {
    this._events.subscribe('user:created', user => {
      const responseUser: ResponseUser = JSON.parse(user);
      this.userName = `${responseUser.nomeUsuario} ${responseUser.sobrenomeUsuario}`;
      this.userEmail = responseUser.emailUsuario;

      if (responseUser.nomeUsuario != undefined && responseUser.sobrenomeUsuario != undefined) {
        this.userInitials = `${responseUser.nomeUsuario.substr(0,1)}${responseUser.sobrenomeUsuario.substr(0,1)}`.toLocaleUpperCase();
      }
    });

    this._events.subscribe('user:provider', isProvider => {
      console.log(isProvider);
      if(isProvider) {
        this._pages = [
          { title: 'Meus dados', component: DetailUserPage.name, icon: 'paper' },
          { title: 'Meus pedidos', component: RequestPage.name, icon: 'paper' },
          { title: 'Agenda', component: SchedulePage.name, icon: 'paper' },
          { title: 'Servico', component: ListServicePage.name, icon: 'paper' }
        ];
      }
      else {
        this._pages = [
          { title: 'Meus dados', component: DetailUserPage.name, icon: 'paper' },
          { title: 'Meus pedidos', component: RequestPage.name, icon: 'paper' },
          { title: 'Cadastrar Prestador', component: RegisterProviderPage.name, icon: 'paper' },
        ];
      }
    });

  }

  openPage(page) {
    this._nav.push(page.component);
  }

  logout() {
    this._nav.setRoot(LoginPage);
  }
}
