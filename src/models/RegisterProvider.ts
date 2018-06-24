export class RegisterProvider {
  private idUsuario: number;
  public get usuario(): string {
    return String(this.idUsuario);
  }
  public set usuario(v: string) {
    this.idUsuario = Number(v.replace(/[^0-9]/g, ''));
  }

  private idEndereco: number;
  public get endereco(): string {
    return String(this.idEndereco);
  }
  public set endereco(v: string) {
    this.idEndereco = Number(v.replace(/[^0-9]/g, ''));
  }

  private idDadosBancario: number;
  public get dadosBancarios(): string {
    return String(this.idDadosBancario);
  }
  public set dadosBancarios(v: string) {
    this.idDadosBancario = Number(v.replace(/[^0-9]/g, ''));
  }

  public longitudePrestador: string;

  public latitudePrestador: string;
}
