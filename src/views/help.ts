import { BaseTreeItem, BaseTreeViewDataProvider } from './trees';
import { TreeItemCollapsibleState } from 'vscode';

export class HelpViewDataProvider extends BaseTreeViewDataProvider {

  async buildTree(): Promise<BaseTreeItem[]> {

    this.refresh();

    const items = [
      new BaseTreeItem('Read documentation', TreeItemCollapsibleState.None, 'book', {
        command: 'vonage.help.openDocs',
        title: '',
        arguments: undefined
      }),
      new BaseTreeItem('Report issue', TreeItemCollapsibleState.None, 'report', {
        command: 'vonage.help.openReportIssue',
        title: '',
        arguments: undefined
      }),
      new BaseTreeItem('Rate and provide feedback', TreeItemCollapsibleState.None, 'feedback', {
        command: 'vonage.help.openSurvey',
        title: '',
        arguments: undefined
      }),
      new BaseTreeItem('Sign out', TreeItemCollapsibleState.None, 'lock', {
        command: 'vonage.logout',
        title: '',
        arguments: undefined,
      })
    ];

    return Promise.resolve(items);
  }
}