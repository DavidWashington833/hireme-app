export class RegisterProvider {
  private enderecoDadosBancario : number;
  public get endereco() : string {
    return String(this.enderecoDadosBancario);
  }
  public set endereco(v : string) {
    this.enderecoDadosBancario = Number(v.replace(/[^0-9]/g,''));
  }

  private tipoDocumentoDadosBancario : string;
  public get tipoDocumento() : string {
    return this.tipoDocumentoDadosBancario;
  }
  public set tipoDocumento(v : string) {
    this.tipoDocumentoDadosBancario = v;
  }

  private agenciaDadosBancario : number;
  public get agencia() : string {
    return String(this.agenciaDadosBancario);
  }
  public set agencia(v : string) {
    this.agenciaDadosBancario = Number(v.replace(/[^0-9]/g,''));
  }

  private contaDadosBancario : number;
  public get conta() : string {
    return String(this.contaDadosBancario);
  }
  public set conta(v : string) {
    this.contaDadosBancario = Number(v.replace(/[^0-9]/g,''));
  }

  private documentoDadosBancario : number;
  public get documento() : string {
    return String(this.documentoDadosBancario);
  }
  public set documento(v : string) {
    this.documentoDadosBancario = Number(v.replace(/[^0-9]/g,''));
  }
}
