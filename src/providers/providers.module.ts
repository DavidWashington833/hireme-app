import { NgModule } from '@angular/core';
import { UsuarioProvider } from './usuario/usuario';
@NgModule({
	declarations: [
    UsuarioProvider
  ],
	imports: [],
	exports: [
    UsuarioProvider
  ]
})
export class ProvidersModule {}
