import { ResponseUser } from './../models/ResponseUser';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MapPage } from '../pages/map/map';
import { RegisterProviderPage } from '../pages/register-provider/register-provider';
import { SchedulePage } from '../pages/schedule/schedule';
import { ListServicePage } from '../pages/list-service/list-service';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  public userName: string = '';
  public userEmail: string = '';

  @ViewChild(Nav)
  private _nav: Nav;
  private _pages: Array<{ title: string, component: any, icon: string }>;
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
      console.log('user',user);
      console.log('responseUser',responseUser);
      console.log('this.userName',this.userName);
      console.log('this.userEmail',this.userEmail);
    });

    this._pages = [
      { title: 'Mapa', component: MapPage.name, icon: 'paper' },
      { title: 'Agenda', component: SchedulePage.name, icon: 'paper' },
      { title: 'Cadastrar Prestador', component: RegisterProviderPage.name, icon: 'paper' },
      { title: 'Servico', component: ListServicePage.name, icon: 'paper' }
    ];
  }

  openPage(page) {
    this._nav.push(page.component);
  }

  logout() {
    this._nav.setRoot(LoginPage);
  }
}
