export class Format {
  public static dateYMD(year: string, month: string, day: string): string {
    return `${year}-${month}-${day}`;
  }

  public static dateYMDHM(year: string, month: string, day: string, hour: string, minute: string): string {
    return `${year}-${month}-${day} ${hour}:${minute}:00`;
  }

  public static onlyNumbers(v: string): number {
    return Number(v.replace(/[^0-9]/g, ''));
  }

  public static onlyStringNumbers(v: string): string {
    return v.replace(/[^0-9]/g, '');
  }
}
