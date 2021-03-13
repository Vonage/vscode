import * as vscode from 'vscode';
import { Telemetry } from "../telemetry";
import { NumbersViewDataProvider, NumberTreeItem } from "../views";

export class NumbersCommands {

  constructor(
    subscriptions: { dispose(): any }[],
    private telemetry: Telemetry,
    private vonageNumbersViewDataProvider: NumbersViewDataProvider) {

    subscriptions.push(vscode.commands.registerCommand('vonage.numbers.refreshNumbersList', this.refreshNumbersList));
    subscriptions.push(vscode.commands.registerCommand('vonage.numbers.buyNumber', this.buyNumber));
    subscriptions.push(vscode.commands.registerCommand('vonage.numbers.assign', this.assignNumber));
    subscriptions.push(vscode.commands.registerCommand('vonage.numbers.unassign', this.unassignNumber));
    subscriptions.push(vscode.commands.registerCommand('vonage.numbers.cancelNumber', this.cancelNumber));
    subscriptions.push(vscode.commands.registerCommand('vonage.numbers.copy', this.copyNumber));
  }

  /** Number commands */
  refreshNumbersList = () => {
    this.telemetry.sendEvent('number.refreshList');
    this.vonageNumbersViewDataProvider.refresh();
  };

  buyNumber = () => {
    this.telemetry.sendEvent('number.buy');
    this.vonageNumbersViewDataProvider.buyNumber();
  }

  cancelNumber = (node?: NumberTreeItem) => {
    this.telemetry.sendEvent('number.cancel');
    if (node) {
      this.vonageNumbersViewDataProvider.cancelNumber(node);
    }
  }

  assignNumber = (node?: NumberTreeItem) => {
    this.telemetry.sendEvent('number.assign');
    if (node) {
      this.vonageNumbersViewDataProvider.assignNumber(node);
    }
  }

  unassignNumber = (node?: NumberTreeItem) => {
    this.telemetry.sendEvent('number.unassign');
    if (node) {
      this.vonageNumbersViewDataProvider.unassignNumber(node);
    }
  }

  copyNumber = (node?: NumberTreeItem) => {
    this.telemetry.sendEvent('number.copy');
    if (node) {
      this.vonageNumbersViewDataProvider.copyNumber(node);
    }
  }
}