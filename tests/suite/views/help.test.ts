import chai from 'chai';
import assert from 'assert';
import { HelpViewDataProvider } from '../../../src/views';

chai.should();

suite('Views:Help', function () {

  const viewProvider = new HelpViewDataProvider();

  test('buildTree provides the correct items', async () => {
    const treeItems = await viewProvider.getChildren();

    treeItems.length.should.eq(4);
  });
});