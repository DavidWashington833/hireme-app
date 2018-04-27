export class Login {
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
}
