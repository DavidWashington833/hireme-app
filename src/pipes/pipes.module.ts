import { NgModule } from '@angular/core';
import { MaskCpfPipe } from './mask-cpf/mask-cpf';
import { MaskTelPipe } from './mask-tel/mask-tel';
@NgModule({
	declarations: [
    MaskCpfPipe,
    MaskTelPipe
  ],
	imports: [
    // MaskCpfPipe,
    // MaskTelPipe
  ],
	exports: [
    MaskCpfPipe,
    MaskTelPipe
  ]
})
export class PipesModule {}
