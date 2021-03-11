import fetch from 'node-fetch';
import querystring from 'querystring';
import { Auth } from '../../auth';

export class AccountAPI {

  private appUrl = 'https://rest.nexmo.com/account';

  /**
   * Retrieves the account balance of the currently authenticated
   * user from the Vonage Account API
   */
  async getBalance(): Promise<number> {
    const isAuthenticated = await Auth.isAuthenticated();
    if (!isAuthenticated) {
      return 0;
    }

    const headers = await Auth.getHeaders();
    const { api_key, api_secret } = await Auth.getCredentials();

    const query = {
      api_key,
      api_secret
    };

    const response = await fetch(`${this.appUrl}/get-balance?${querystring.stringify(query)}`, { method: 'GET', headers });
    const data = await response.json();
    return data.value;
  }

}