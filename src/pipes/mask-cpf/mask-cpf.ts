import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCpf',
})
export class MaskCpfPipe implements PipeTransform {
  transform(value: string, ...args) {
    let n: Array<string> = value.replace(/[^0-9]/g, '').split('');

    if (n.length > 11) {
      n = n.slice(0, 11);
    }

    const mask =
      (n.length >= 3 ? `${n[0]}${n[1]}${n[2]}.` : '') +
      (n.length >= 6 ? `${n[3]}${n[4]}${n[5]}.` : '') +
      (n.length >= 9 ? `${n[6]}${n[7]}${n[8]}-` : '') +
      (n.length >= 11 ? `${n[9]}${n[10]}` : '');

    return mask;
  }
}
