import * as sinon from 'sinon';
import * as vscode from 'vscode';
import * as assert from 'assert';
import * as utils from '../../src/utils';

suite('Utils', () => {
  const arr = [1, 2, 3];
  let sandbox: sinon.SinonSandbox;

  setup(() => {
    sandbox = sinon.createSandbox();
  });

  teardown(() => {
    sandbox.restore();
  });

  suite('getExtensionInfo', () => {
    test('getExtensionInfo returns vonage.vscode extension', async () => {
      const extensionInfo = utils.getExtensionInfo();

      assert.notDeepStrictEqual(extensionInfo, {});
      assert.strictEqual(<vscode.Extension<any>>extensionInfo.id, 'vonage.vscode');
    });
  });
});