import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskTel',
})
export class MaskTelPipe implements PipeTransform {
  transform(value: string, ...args) {
    let n: Array<string> = value.replace(/[^0-9]/g, '').split('');

    if (n.length > 11) {
      n = n.slice(0, 11);
    }

    const mask =
      (n.length >= 2 ? `(${n[0]}${n[1]}) ` : '') +
      (n.length >= 7 ? `${n[2]}${n[3]}${n[4]}${n[5]}${n[6]}-` : '') +
      (n.length >= 11 ? `${n[7]}${n[8]}${n[9]}${n[10]}` : '');

    return mask;
  }
}
