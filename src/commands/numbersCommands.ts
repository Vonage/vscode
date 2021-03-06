import * as vscode from 'vscode';
import { Telemetry } from "../telemetry";
import { NumbersViewDataProvider } from "../views";

export class NumbersCommands {

  constructor(
    subscriptions: { dispose(): any }[],
    private telemetry: Telemetry,
    private vonageNumbersViewDataProvider: NumbersViewDataProvider) {

    subscriptions.push(vscode.commands.registerCommand('vonage.numbers.refreshNumbersList', this.refreshNumbersList));
    subscriptions.push(vscode.commands.registerCommand('vonage.numbers.searchNumbers', this.filterNumbers));
    subscriptions.push(vscode.commands.registerCommand('vonage.numbers.buyNumber', this.buyNumber));
  }

  /** Number commands */
  refreshNumbersList = () => {
    this.telemetry.sendEvent('number.refreshList');
    this.vonageNumbersViewDataProvider.refresh();
  };

  filterNumbers = () => {
    this.telemetry.sendEvent('number.search');
    this.vonageNumbersViewDataProvider.searchNumbers();
  }

  buyNumber = () => {
    this.telemetry.sendEvent('number.buy');
    this.vonageNumbersViewDataProvider.buyNumber();
  }
}