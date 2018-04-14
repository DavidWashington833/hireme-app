export class RegisterUser {
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

  private senhaUsuario : string;
  public get senha() : string {
    return this.senhaUsuario;
  }
  public set senha(v : string) {
    this.senhaUsuario = v;
  }

  private cpfUsuario : string;
  public get cpf() : string {
    return this.cpfUsuario;
  }
  public set cpf(v : string) {
    this.cpfUsuario = v;
  }

  private celularUsuario : string;
  public get celular() : string {
    return this.celularUsuario;
  }
  public set celular(v : string) {
    this.celularUsuario = v;
  }

  private nascimentoUsuario : string;
  public get nascimento() : string {
    return this.nascimentoUsuario;
  }
  public set nascimento(v : string) {
    this.nascimentoUsuario = v;
  }

}
