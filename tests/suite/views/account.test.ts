import chai from 'chai';
import assert from 'assert';
import Sinon from 'sinon';
import { VonageClient } from '../../../src/client/vonageClient';
import { AccountViewDataProvider } from '../../../src/views';
import { mocks, TestMemento } from '../../mocks';
import { StorageKeys } from '../../../src/enums';

chai.should();

suite('Views:Account', function () {

  const storage = new TestMemento();
  let viewProvider: AccountViewDataProvider;
  const fakeGetBalance = () => Promise.resolve(1.784);
  Sinon.replace(VonageClient.account, 'getBalance', fakeGetBalance);

  this.beforeEach(function () {
    storage.storage = new Map();
    viewProvider = new AccountViewDataProvider(storage);
  });

  test('buildTree hides balance when appropriate', async () => {
    storage.update(StorageKeys.hideAccountBalance, true);

    const treeItems = await viewProvider.getChildren();

    const balanceTreeItem = treeItems[0];
    balanceTreeItem.should.exist;
    assert.notDeepStrictEqual(balanceTreeItem.label, undefined);
    if (balanceTreeItem && balanceTreeItem.label) {
      balanceTreeItem.label.should.eq(`Balance: € ----`);
    }
  });

  test('buildTree shows balance when appropriate', async () => {
    const treeItems = await viewProvider.getChildren();

    const balanceTreeItem = treeItems[0];
    balanceTreeItem.should.exist;
    assert.notDeepStrictEqual(balanceTreeItem.label, undefined);
    if (balanceTreeItem && balanceTreeItem.label) {
      balanceTreeItem.label.should.eq(`Balance: € 1.78`);
    }
  });

  test('toggleBalanceView toggles hideAccountBalance setting', async () => {
    await viewProvider.toggleBalanceView();

    const shouldHide = storage.get(StorageKeys.hideAccountBalance);
    shouldHide.should.eq(true);
  });
});