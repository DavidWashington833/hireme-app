export class EditUser {
  private nomeUsuario : string;
  public get nome() : string {
    return this.nomeUsuario;
  }
  public set nome(v : string) {
    this.nomeUsuario = v;
  }

  private sobrenomeUsuario : string;
  public get sobrenome() : string {
    return this.sobrenomeUsuario;
  }
  public set sobrenome(v : string) {
    this.sobrenomeUsuario = v;
  }

  private emailUsuario : string;
  public get email() : string {
    return this.emailUsuario;
  }
  public set email(v : string) {
    this.emailUsuario = v;
  }

  private CPFUsuario : string;
  public get cpf() : string {
    return this.CPFUsuario;
  }
  public set cpf(v : string) {
    this.CPFUsuario = v.replace(/[^0-9]/g,'');
  }

  private celularUsuario : string;
  public get celular() : string {
    return this.celularUsuario;
  }
  public set celular(v : string) {
    this.celularUsuario = v.replace(/[^0-9]/g,'');
  }

  private nascimentoUsuario : string;
  public get nascimento() : string {
    return this.nascimentoUsuario;
  }
  public set nascimento(v : string) {
    this.nascimentoUsuario = v;
  }
}
