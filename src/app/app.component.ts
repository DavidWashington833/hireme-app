import { MapaPage } from './../pages/mapa/mapa';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { CadastroPrestadorPage } from '../pages/cadastro-prestador/cadastro-prestador';
import { RecuperacaoDeSenhaPage } from '../pages/recuperacao-de-senha/recuperacao-de-senha';
import { CadastroServicoPage } from '../pages/cadastro-servico/cadastro-servico';
import { ServicosPage } from '../pages/servicos/servicos';
@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;
  rootPage:any = LoginPage;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private _menuCtrl: MenuController
  ) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Serviços', component: ServicosPage.name },
      { title: 'Mapa', component: MapaPage.name },
      { title: 'Cadastrar Prestador', component: CadastroPrestadorPage.name },
      { title: 'Cadastrar Servico', component: CadastroServicoPage.name },
      { title: 'Sair', component: LoginPage }
    ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  sair() {
    this.nav.setRoot(LoginPage.name);
  }
}
