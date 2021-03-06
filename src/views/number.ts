import { VonageClient } from '../client/vonageClient';
import { NumberTreeItem, BaseTreeViewDataProvider } from './trees';

export class NumbersViewDataProvider extends BaseTreeViewDataProvider {

  private hasNumbers: boolean = false;

  async buildTree(): Promise<NumberTreeItem[]> {
    const numbers = await VonageClient.numbers.getNumbers(this.hasNumbers);

    return Promise.resolve(numbers.map((num: any) => {
      return new NumberTreeItem(num)
    }));
  }

  async searchNumbers(): Promise<string> {
    return '';
  }

  async buyNumber(): Promise<string> {
    return '';
  }
}