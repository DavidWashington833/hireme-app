import { Format } from './../utils/Format';

export class RegisterAddress {
  private ruaEndereco: string;
  public get rua(): string {
    return this.ruaEndereco;
  }
  public set rua(v: string) {
    this.ruaEndereco = v;
  }

  private logradouroEndereco: string;
  public get logradouro(): string {
    return this.logradouroEndereco;
  }
  public set logradouro(v: string) {
    this.logradouroEndereco = v;
  }

  private complementoEndereco: string;
  public get complemento(): string {
    return this.complementoEndereco;
  }
  public set complemento(v: string) {
    this.complementoEndereco = v;
  }

  private estadoEndereco: string;
  public get estado(): string {
    return this.estadoEndereco;
  }
  public set estado(v: string) {
    this.estadoEndereco = v;
  }

  private cidadeEndereco: string;
  public get cidade(): string {
    return this.cidadeEndereco;
  }
  public set cidade(v: string) {
    this.cidadeEndereco = v;
  }

  private numeroEndereco: number;
  public get numero(): string {
    return String(this.numeroEndereco);
  }
  public set numero(v: string) {
    this.numeroEndereco = Format.onlyNumbers(v);
  }

  private CEPEndereco: string;
  public get cep(): string {
    return String(this.CEPEndereco);
  }
  public set cep(v: string) {
    this.CEPEndereco = Format.onlyStringNumbers(v);
  }

  public idUsuario: number;

  public longitudeEndereco: string;

  public latitudeEndereco: string;
}
