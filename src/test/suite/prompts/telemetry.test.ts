// tslint:disable: no-unused-expression
import * as vscode from 'vscode';
// import * as sinon from 'sinon';
// import * as chai from 'chai';
import moment from 'moment';
// import { fakeMemento, fakeWorkspaceConfiguration } from '../../../../.github/fakes';
import { StorageKeys } from '../../../enums';
import { TelemetryPrompt } from '../../../prompts';

// chai.should();

suite('Telemetry Prompt Tests', function () {
  // let fakeState: vscode.Memento;
  // let fakeWorkspaceConfig: vscode.WorkspaceConfiguration;
  // let fakeTelemetryPrompt: TelemetryPrompt;
  // let getConfigurationStub: sinon.SinonStub<[(string | undefined)?, (vscode.Uri | null | undefined)?], vscode.WorkspaceConfiguration>;

  // suiteSetup(function () {
  //   fakeState = fakeMemento;
  //   fakeWorkspaceConfig = fakeWorkspaceConfiguration;
  // });

  // suiteTeardown(function () {
  //   getConfigurationStub.restore();
  // });

  // setup(async function () {
  //   getConfigurationStub.resetHistory();
  //   fakeState.update(StorageKeys.doNotShowTelemetryPromptAgain, false);
  //   fakeTelemetryPrompt = new TelemetryPrompt(fakeState);
  // });

  // test(`Should show if never shown`, async function () {
  //   const windowShowInformationMessageStub = sinon.stub(vscode.window, 'showInformationMessage');
  //   fakeTelemetryPrompt.activate();
  //   windowShowInformationMessageStub.calledOnce.should.be.true;
  // });

  // test(`Should not show if shown before`, async function () {
  //   fakeState.update(StorageKeys.doNotShowSurveyPromptAgain, true);
  //   const windowShowInformationMessageStub = sinon.stub(vscode.window, 'showInformationMessage');

  //   fakeTelemetryPrompt.activate();

  //   windowShowInformationMessageStub.called.should.be.false;
  // });

});