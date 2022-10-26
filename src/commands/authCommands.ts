import * as vscode from 'vscode';
import { Telemetry } from '../telemetry';
import { LoginFlow } from '../steps';
import { Auth } from '../auth';

export class AuthCommands {

  constructor(
    private subscriptions: { dispose(): any }[],
    private telemetry: Telemetry) {

    subscriptions.push(vscode.commands.registerCommand('vonage.login', this.login));
    subscriptions.push(vscode.commands.registerCommand('vonage.logout', this.logout));
  }

  /**
   * Request and store Vonage API key & secret
   * in order to use extension.
   */
  login = async (): Promise<void> => {
    this.telemetry.sendEvent('Auth', 'login');

    const state = await LoginFlow.collectInputs();

    if (state.api_key?.length > 0 && state.api_secret?.length > 0) {
      await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Configuring extension"...`
      }, async () => {
        await Auth.login(state.api_key, state.api_secret);
      });
    } else {
      vscode.window.showErrorMessage('Your Vonage API key & secret are required to use the Vonage for VS Code extension.');
    }
  };

  logout = async (): Promise<void> => {
    this.telemetry.sendEvent('Auth', 'logout');
    await Auth.logout();
  };
}