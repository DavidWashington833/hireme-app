import { NgModule } from '@angular/core';
import { UsuarioProvider } from './usuario/usuario';
import { AlertProvider } from './alert/alert';
import { GoogleMapsAPIWrapper } from '@agm/core';

@NgModule({
	declarations: [
    UsuarioProvider,
    AlertProvider
  ],
	imports: [],
	exports: [
    UsuarioProvider,
    AlertProvider,
  ]
})
export class ProvidersModule {}
