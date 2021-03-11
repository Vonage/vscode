import * as vscode from 'vscode';

export class BaseTreeItem extends vscode.TreeItem {
  parent: BaseTreeItem | undefined;
  children: BaseTreeItem[] = [];

  constructor(
    label: string,
    collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None,
    icon: string,
    command?: vscode.Command,
    contextValue = 'vonage') {
    super(label, collapsibleState);
    this.command = command;
    this.contextValue = contextValue;
    this.iconPath = new vscode.ThemeIcon(icon);
  }

  makeCollapsible() {
    this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
  }
  expand() {
    this.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
  }

}