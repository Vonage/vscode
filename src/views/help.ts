import { BaseTreeItem, BaseTreeViewDataProvider } from './trees';
import { TreeItemCollapsibleState } from 'vscode';

export class HelpViewDataProvider extends BaseTreeViewDataProvider {

  async buildTree(): Promise<BaseTreeItem[]> {

    this.refresh();

    const items = [
      new BaseTreeItem('Read documentation', TreeItemCollapsibleState.None, 'books-line', {
        command: 'vonage.help.openDocs',
        title: '',
        arguments: undefined
      }),
      new BaseTreeItem('Report issue', TreeItemCollapsibleState.None, 'error-line', {
        command: 'vonage.help.openReportIssue',
        title: '',
        arguments: undefined
      }),
      new BaseTreeItem('Rate and provide feedback', TreeItemCollapsibleState.None, 'emoji-line', {
        command: 'vonage.help.openSurvey',
        title: '',
        arguments: undefined
      }),
      new BaseTreeItem('Sign out', TreeItemCollapsibleState.None, 'leave-line', {
        command: 'vonage.logout',
        title: '',
        arguments: undefined
      })
    ];

    return Promise.resolve(items);
  }
}