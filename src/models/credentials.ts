export interface ICredentials {

  api_key?: string;
  api_secret?: string;

  isAuthenticated(): boolean;
}

export class Credentials implements ICredentials {
  constructor(
    public api_key?: string,
    public api_secret?: string) { }

  public isAuthenticated(): boolean {
    if (this.api_key && this.api_secret) {
      return true;
    }
    return false;
  }
}