import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCpf',
})
export class MaskCpfPipe implements PipeTransform {
  transform(value: string, ...args) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
  }
}
