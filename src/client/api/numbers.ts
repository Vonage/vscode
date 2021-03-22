import { INumber } from '@vonage/server-sdk';
import fetch from 'node-fetch';
import querystring from 'querystring';
import { Auth } from '../../auth';

export class NumbersAPI {

  private accountUrl = 'https://rest.nexmo.com/account/numbers';
  private numbersUrl = 'https://rest.nexmo.com/number';

  async getNumbers(applicationId?: string): Promise<any> {
    const isAuthenticated = await Auth.isAuthenticated();
    if (!isAuthenticated) {
      return [];
    }

    const headers = await Auth.getHeaders();
    const { api_key, api_secret } = await Auth.getCredentials();

    const query = {
      api_key,
      api_secret,
      has_application: applicationId !== undefined,
      application_id: applicationId
    };

    const response = await fetch(`${this.accountUrl}?${querystring.stringify(query)}`, { method: 'GET', headers });
    try {
      const data = await response.json();
      return data.numbers || [];
    } catch (err) {
      console.dir(response);
      return [];
    }
  }

  async buyNumber(state: any): Promise<boolean> {
    const { api_key, api_secret } = await Auth.getCredentials();

    const query: any = {
      api_key,
      api_secret
    };

    const params = new URLSearchParams();
    params.append('country', state.country);
    params.append('msisdn', state.msisdn);

    const response = await fetch(`${this.numbersUrl}/buy?${querystring.stringify(query)}`, { method: 'POST', body: params });
    if (response.ok) {
      return true;
    } else {
      const err = await response.json();
      console.dir(err);
      return false;
    }
  }

  async assignToApplication(number: any, applicationId: string): Promise<boolean> {
    // const headers = await Auth.getHeaders();
    const { api_key, api_secret } = await Auth.getCredentials();

    number.app_id = applicationId;

    const query = {
      api_key,
      api_secret
    };

    const params = new URLSearchParams();

    Object.keys(number).forEach((key: string) => {
      params.append(key, number[key]);
    });

    const response = await fetch(`${this.numbersUrl}/update?${querystring.stringify(query)}`, { method: 'POST', body: params });
    if (response.ok) {
      return true;
    } else {
      const err = await response.json();
      console.dir(err);
      return false;
    }
    return false;
  }

  async unassignNumber(number: any): Promise<boolean> {
    const { api_key, api_secret } = await Auth.getCredentials();

    const query: any = {
      api_key,
      api_secret
    };

    const params = new URLSearchParams();
    params.append('country', number.country);
    params.append('msisdn', number.msisdn);

    const response = await fetch(`${this.numbersUrl}/update?${querystring.stringify(query)}`, { method: 'POST', body: params });
    if (response.ok) {
      return true;
    } else {
      const err = await response.json();
      console.dir(err);
      return false;
    }
  }

  async searchNumbers(state: any): Promise<INumber[]> {
    const { api_key, api_secret } = await Auth.getCredentials();

    const query: any = {
      api_key,
      api_secret,
      country: state.country
    };
    if (state.features) {
      query.features = state.features;
    }
    if (state.pattern) {
      query.pattern = state.pattern;
      query.search_pattern = state.search_pattern;
    } 
    if (state.type) {
      query.type = state.type;
    }

    const response = await fetch(`${this.numbersUrl}/search?${querystring.stringify(query)}`, { method: 'GET' });
    if (response.ok) {
      const data = await response.json();
      return data.numbers;
    } else {
      const err = await response.json();
      console.dir(err);
      return [];
    }
    return [];

  }

  async cancelNumber(number: INumber): Promise<boolean> {
    const { api_key, api_secret } = await Auth.getCredentials();

    const query: any = {
      api_key,
      api_secret
    };

    const params = new URLSearchParams();
    params.append('country', number.country);
    params.append('msisdn', number.msisdn);

    const response = await fetch(`${this.numbersUrl}/cancel?${querystring.stringify(query)}`, { method: 'POST', body: params });
    if (response.ok) {
      return true;
    } else {
      const err = await response.json();
      console.dir(err);
      return false;
    }
  }
}