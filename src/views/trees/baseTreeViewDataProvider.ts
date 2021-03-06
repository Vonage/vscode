import { Event, EventEmitter, TreeDataProvider, TreeItem } from 'vscode';
import { BaseTreeItem } from './baseTreeItem';

export class BaseTreeViewDataProvider implements TreeDataProvider<TreeItem> {
  private treeItems: TreeItem[] | null = null;
  private _onDidChangeTreeData: EventEmitter<TreeItem | null> = new EventEmitter<TreeItem | null>();
  readonly onDidChangeTreeData: Event<TreeItem | null> = this._onDidChangeTreeData.event;

  public refresh() {
    this.treeItems = null;
    this._onDidChangeTreeData.fire(null);
  }

  public getTreeItem(element: TreeItem): TreeItem {
    return element;
  }

  public getParent(element: TreeItem): TreeItem | null {
    if (element instanceof BaseTreeItem && element.parent) {
      return element.parent;
    }
    return null;
  }

  public async getChildren(element?: TreeItem): Promise<TreeItem[]> {
    if (!this.treeItems) {
      this.treeItems = await this.buildTree();
    }

    if (element instanceof BaseTreeItem) {
      return element.children;
    }

    if (!element) {
      if (this.treeItems) {
        return this.treeItems;
      }
    }
    return [];
  }

  buildTree(): Promise<BaseTreeItem[]> {
    return Promise.resolve([]);
  }
}