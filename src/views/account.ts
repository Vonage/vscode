import { Memento, TreeItemCollapsibleState } from 'vscode';
import { VonageClient } from '../client/vonageClient';
import { StorageKeys } from '../enums';
import { BaseTreeItem, BaseTreeViewDataProvider } from './trees';

export class AccountViewDataProvider extends BaseTreeViewDataProvider {

  private storage: Memento;

  constructor(state: Memento) {
    super();
    this.storage = state;
  }

  async buildTree(): Promise<BaseTreeItem[]> {
    const currentHideState = this.storage.get(StorageKeys.hideAccountBalance) as boolean || false;
    let balance = "€ ----";

    if (!currentHideState) {
      const currentBalance = await VonageClient.account.getBalance();
      balance = `€ ${currentBalance.toFixed(2)}`;
    }

    const accountTreeItem = new BaseTreeItem(
      `Balance: ${balance}`,
      TreeItemCollapsibleState.None,
      'wallet-line',
      {
        command: 'vonage.account.toggleBalanceView',
        title: '',
        arguments: undefined
      },
      'account');

    accountTreeItem.tooltip = "Click to toggle visibility";

    return [
      accountTreeItem
    ];
  }

  toggleBalanceView(): void {
    const currentHideState = this.storage.get(StorageKeys.hideAccountBalance) as boolean || false;

    this.storage.update(StorageKeys.hideAccountBalance, !currentHideState);
    this.refresh();
  }
}