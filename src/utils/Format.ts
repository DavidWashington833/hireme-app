export class Format {
  public static dateYMD(year: string, month: string, day: string): string {
    return `${year}-${month}-${day}`;
  }

  public static onlyNumbers(v: string): number {
    return Number(v.replace(/[^0-9]/g,''));
  }

  public static onlyStringNumbers(v: string): string {
    return v.replace(/[^0-9]/g,'');
  }
}
