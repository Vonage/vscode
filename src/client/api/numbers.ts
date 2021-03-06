import fetch from 'node-fetch';
import querystring from 'querystring';
import { Auth } from '../../auth';

export class NumbersAPI {

  constructor() { }

  private appUrl = 'https://rest.nexmo.com/account/numbers';

  async getNumbers(hasApplication?: boolean): Promise<any> {
    const isAuthenticated = await Auth.isAuthenticated();
    if (!isAuthenticated) {
      return [];
    }

    const headers = await Auth.getHeaders();
    const { api_key, api_secret } = await Auth.getCredentials();

    const query = {
      api_key,
      api_secret,
      has_application: hasApplication
    };

    const response = await fetch(`${this.appUrl}?${querystring.stringify(query)}`, { method: 'GET', headers });
    const data = await response.json();
    return data.numbers;
  }

  async buyNumber(): Promise<any> {
    return undefined;
  }

}