import * as vscode from 'vscode';
import { VonageClient } from '../client/vonageClient';
import { AssignNumberFlow } from '../steps';
import { BuyNumberFlow } from '../steps/buyNumberFlow';
import { showWarningMessage } from '../utils';
import { NumberTreeItem, BaseTreeViewDataProvider } from './trees';

const numberAssignmentEventEmitter = new vscode.EventEmitter<string>();

export class NumbersViewDataProvider extends BaseTreeViewDataProvider {

  private storage: vscode.Memento;
  public onNumberAssignmentChanged = numberAssignmentEventEmitter.event;

  constructor(state: vscode.Memento) {
    super();
    this.storage = state;
  }

  async buildTree(): Promise<NumberTreeItem[]> {
    const numbers = await VonageClient.numbers.getNumbers();

    if (numbers.length > 0) {
      return Promise.resolve(numbers.map((num: any) => {
        return new NumberTreeItem(num);
      }));
    } else {
      return [];
    }
  }

  async buyNumber(): Promise<void> {
    const state = await BuyNumberFlow.collectInputs(this.storage);

    const assignResult = await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `Purchasing ${state.msisdn}...`
    }, async () => {
      return await VonageClient.numbers.buyNumber(state);
    });

    if (assignResult) {
      this.refresh();
    }
  }

  async cancelNumber(node: NumberTreeItem): Promise<void> {
    const confirmDelete = `Are you sure you want to remove "${node.label}"? This cannot be undone.`;

    const result = await showWarningMessage(confirmDelete, undefined, { modal: true }, { title: 'Remove' });

    if (result === true) {

      const deleteResult = await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Removing number "${node.label}"...`
      }, async () => {
        return await VonageClient.numbers.cancelNumber(node.number);
      });

      if (deleteResult) {
        this.refresh();
        numberAssignmentEventEmitter.fire('');
        vscode.window.showInformationMessage(`Successfully removed number "${node.label}".`);
      }
    } else {
      return;
    }
  }

  async assignNumber(node: NumberTreeItem): Promise<void> {

    const state = await AssignNumberFlow.collectInputs();
    const number = node.number;

    const assignResult = await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `Assigning ${number.msisdn} to ${state.name}...`
    }, async () => {
      return await VonageClient.numbers.assignToApplication(number, state.applicationId);
    });

    if (assignResult) {
      this.refresh();
      numberAssignmentEventEmitter.fire('');
    }
  }

  async unassignNumber(node: NumberTreeItem): Promise<void> {
    const confirmDelete = `Are you sure you want to unlink "${node.label}"?`;

    const result = await showWarningMessage(confirmDelete, undefined, { modal: true }, { title: 'Unlink' });

    if (result === true) {

      const deleteResult = await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Unlinking "${node.label}"...`
      }, async () => {
        return await VonageClient.numbers.unassignNumber(node.number);
      });

      if (deleteResult) {
        this.refresh();
        numberAssignmentEventEmitter.fire('');
        vscode.window.showInformationMessage(`Successfully unlinked number "${node.label}".`);
      }
    } else {
      return;
    }
  }

  async copyNumber(node: NumberTreeItem): Promise<void> {
    vscode.env.clipboard.writeText(`+${node.number.msisdn}`);
    vscode.window.showInformationMessage(`'+${node.number.msisdn}' copied to clipboard`);
  }
}