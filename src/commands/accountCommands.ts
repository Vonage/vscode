import { commands } from 'vscode';
import { Telemetry } from "../telemetry";
import { AccountViewDataProvider } from '../views';

export class AccountCommands {

  constructor(
    subscriptions: { dispose(): any }[],
    private telemetry: Telemetry,
    private accountViewDataProvider: AccountViewDataProvider) {

    subscriptions.push(commands.registerCommand('vonage.account.refresh', this.refresh));
    subscriptions.push(commands.registerCommand('vonage.account.toggleBalanceView', this.toggleBalanceView));
  }

  refresh = async (): Promise<void> => {
    this.accountViewDataProvider.refresh();
  }

  toggleBalanceView = (): void => {
    this.accountViewDataProvider.toggleBalanceView();
  }
}