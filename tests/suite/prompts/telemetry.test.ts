import vscode from 'vscode';
import Sinon from 'sinon';
import chai from 'chai';
import { TelemetryPrompt } from '../../../src/prompts';
import { StorageKeys } from '../../../src/enums';
import { TestMemento } from '../../mocks';

chai.should();

suite('Prompt:Telemetry', function() {

  const storage = new TestMemento();
  let telemetryPrompt: TelemetryPrompt;
  const windowShowInformationMessageStub = Sinon.stub(vscode.window, 'showInformationMessage');

  this.beforeEach(function() {
    storage.storage = new Map();
    telemetryPrompt = new TelemetryPrompt(storage);
    storage.update(StorageKeys.doNotShowTelemetryPromptAgain, false);
    windowShowInformationMessageStub.resetHistory();
  });

  this.afterAll(function() {
    windowShowInformationMessageStub.restore();
  });

  test(`should show if never shown`, function () {
    telemetryPrompt.activate();

    windowShowInformationMessageStub.calledOnce.should.be.true;
  });

  test(`should not show if shown before`, function () {
    storage.update(StorageKeys.doNotShowTelemetryPromptAgain, true);

    telemetryPrompt.activate();

    windowShowInformationMessageStub.called.should.be.false;
  });
});