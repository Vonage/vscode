import vscode from 'vscode';
import fetch from 'node-fetch';
import { Auth } from '../../auth';
import { ApplicationTreeItem } from '../../views';

export class ApplicationAPI {

  private appUrl = 'https://api.nexmo.com/v2/applications';

  async getApplications(): Promise<any> {
    const isAuthenticated = await Auth.isAuthenticated();
    if (!isAuthenticated) {
      return [];
    }

    try {
      const headers = await Auth.getHeaders();
      const response = await fetch(this.appUrl, { method: 'GET', headers });
      if (response.ok) {
        const data = await response.json();
        return data._embedded.applications;
      } else {
        vscode.window.showErrorMessage('There was an error retrieving applications.');
      }
    } catch (err) {
      vscode.window.showErrorMessage('There was an error retrieving applications.');
    }
    return [];
  }

  async getApplication(applicationId: string): Promise<any> {
    const headers = await Auth.getHeaders();

    const response = await fetch(`${this.appUrl}/${applicationId}`, { method: 'GET', headers });
    const data = await response.json();
    return data;
  }

  async createApplication(state: any): Promise<boolean> {
    const headers = await Auth.getHeaders();

    const body = {
      name: state.name,
      keys: { public_key: state.public_key }
    };

    const response = await fetch(this.appUrl, { method: 'POST', headers, body: JSON.stringify(body) });
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  }

  async updateApplication(application: any): Promise<boolean> {
    const headers = await Auth.getHeaders();

    const response = await fetch(`${this.appUrl}/${application.id}`, { method: 'PUT', headers, body: JSON.stringify(application) });
    if (response.ok) {
      return true;
    } else {
      const err = await response.json();
      console.dir(err);
      return false;
    }

    return false;
  }

  async deleteApplication(node: ApplicationTreeItem): Promise<any> {
    const headers = await Auth.getHeaders();

    const response = await fetch(`${this.appUrl}/${node.application.id}`, { method: 'DELETE', headers });
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  }
}