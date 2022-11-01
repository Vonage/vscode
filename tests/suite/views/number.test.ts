import * as vscode from 'vscode';
import chai from 'chai';
import Sinon from 'sinon';
import assert from 'assert';
import { NumbersViewDataProvider, NumberTreeItem } from '../../../src/views';
import { TestMemento, vonage } from '../../mocks';
import { VonageClient } from '../../../src/client/vonageClient';

chai.should();

suite('Views:Number', function () {

  const storage = new TestMemento();
  const viewProvider = new NumbersViewDataProvider(storage);
  const fakeGetNumbers = () => Promise.resolve([vonage.numberMock]);
  Sinon.replace(VonageClient.numbers, 'getNumbers', fakeGetNumbers);
  
  this.beforeEach(function () {
    storage.storage = new Map();
  });

  test('buildTree displays numbers correctly', async () => {
    const treeItems = await viewProvider.getChildren();

    treeItems.length.should.eq(1);

    const treeItem  = treeItems[0];
    treeItem.should.exist;
    assert.notDeepStrictEqual(treeItem.label, undefined);
    if (treeItem && treeItem.label) {
      treeItem.label.should.eq(`+${vonage.numberMock.msisdn}`);
    }
  });

  test('copyNumber adds the msisdn to the clipboard', async () => {
    const windowShowInformationMessageStub = Sinon.stub(vscode.window, 'showInformationMessage');
    const node = new NumberTreeItem(vonage.numberMock);

    await viewProvider.copyNumber(node);

    const clipboard = await vscode.env.clipboard.readText();
    
    clipboard.should.eq(vonage.numberMock.msisdn);
    windowShowInformationMessageStub.calledOnce.should.eq(true);

    windowShowInformationMessageStub.restore();
  });
});