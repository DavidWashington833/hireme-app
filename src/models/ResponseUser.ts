export class ResponseUser {
  public idUsuario: number;
  public get id(): number {
    return this.idUsuario;
  }
  public set id(v: number) {
    this.idUsuario = v;
  }

  public nomeUsuario: string;
  public get nome(): string {
    return this.nomeUsuario;
  }
  public set nome(v: string) {
    this.nomeUsuario = v;
  }

  public ativoUsuario: number;
  public get ativo(): number {
    return this.ativoUsuario;
  }
  public set ativo(v: number) {
    this.ativoUsuario = v;
  }

  public sobrenomeUsuario: string;
  public get sobrenome(): string {
    return this.sobrenomeUsuario;
  }
  public set sobrenome(v: string) {
    this.sobrenomeUsuario = v;
  }

  public tokenCartaoUsuario: string;
  public get tokenCartao(): string {
    return this.tokenCartaoUsuario;
  }
  public set tokenCartao(v: string) {
    this.tokenCartaoUsuario = v;
  }

  public emailUsuario: string;
  public get email(): string {
    return this.emailUsuario;
  }
  public set email(v: string) {
    this.emailUsuario = v;
  }

  public CPFUsuario: number;
  public get cpf(): string {
    return String(this.CPFUsuario);
  }
  public set cpf(v: string) {
    this.CPFUsuario = Number(v.replace(/[^0-9]/g, ''));
  }

  public celularUsuario: number;
  public get celular(): string {
    return String(this.celularUsuario);
  }
  public set celular(v: string) {
    this.celularUsuario = Number(v.replace(/[^0-9]/g, ''));
  }

  public nascimentoUsuario: string;
  public get nascimento(): string {
    return this.nascimentoUsuario;
  }
  public set nascimento(v: string) {
    this.nascimentoUsuario = v;
  }
}
