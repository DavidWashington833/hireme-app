import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MapaPage } from './../pages/mapa/mapa';
import { LoginPage } from '../pages/login/login';
import { CadastroPrestadorPage } from '../pages/cadastro-prestador/cadastro-prestador';
import { RecuperacaoDeSenhaPage } from '../pages/recuperacao-de-senha/recuperacao-de-senha';
import { CadastroServicoPage } from '../pages/cadastro-servico/cadastro-servico';
import { ServicosPage } from '../pages/servicos/servicos';

@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  @ViewChild(Nav)
  private _nav: Nav;
  private _pages: Array<{title: string, component: any, icon: string}>;
  private _rootPage: any = LoginPage;

  constructor(
    private _platform: Platform,
    private _statusBar: StatusBar,
    private _splashScreen: SplashScreen,
    private _menuCtrl: MenuController
  ) {
    this._pages = [
      { title: 'Mapa', component: MapaPage.name, icon: 'paper' },
      { title: 'Serviços', component: ServicosPage.name, icon: 'paper' },
      { title: 'Cadastrar Prestador', component: CadastroPrestadorPage.name, icon: 'paper' },
      { title: 'Cadastrar Servico', component: CadastroServicoPage.name, icon: 'paper' },
      { title: 'Sair', component: LoginPage, icon: 'paper' }
    ];
  }

  public get pages() {
    return this._pages;
  }

  public get rootPage() {
    return this._rootPage;
  }

  initializeApp() {
    this._platform.ready().then(() => {
      this._statusBar.styleDefault();
      this._splashScreen.hide();
    });
  }

  openPage(page) {
    this._nav.setRoot(page.component);
  }
}
