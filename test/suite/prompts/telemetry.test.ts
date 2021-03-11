// import vscode from 'vscode';
// import sinon from 'sinon';
// import chai from 'chai';
// import { TelemetryPrompt } from '../../../src/prompts';
// import { StorageKeys } from '../../../src/enums';

// chai.should();

// suite('Telemetry Prompt Tests', () => {

//   let fakeState: vscode.Memento;
//   let fakeWorkspaceConfig: vscode.WorkspaceConfiguration;
//   let fakeTelemetryPrompt: TelemetryPrompt;
//   let getConfigurationStub: sinon.SinonStub<[(string | undefined)?, (vscode.Uri | null | undefined)?], vscode.WorkspaceConfiguration>;
//   let windowShowInformationMessageStub: sinon.SinonStub;

//   suiteSetup(function () {
//     fakeState = fakeMemento;
//     fakeWorkspaceConfig = fakeWorkspaceConfiguration;
//     windowShowInformationMessageStub = sinon.stub(vscode.window, 'showInformationMessage');
//   });

//   suiteTeardown(function () {
//     windowShowInformationMessageStub.restore();
//   });

//   setup(async function () {
//     windowShowInformationMessageStub.resetHistory();
//     fakeState.update(StorageKeys.doNotShowTelemetryPromptAgain, false);
//     fakeTelemetryPrompt = new TelemetryPrompt(fakeState);
//   });

//   test(`Should show if never shown`, async function () {
//     fakeTelemetryPrompt.activate();
//     windowShowInformationMessageStub.calledOnce.should.be.true;
//   });

//   test(`Should not show if shown before`, async function () {

//     console.log(windowShowInformationMessageStub.callCount);
//         fakeState.update(StorageKeys.doNotShowSurveyPromptAgain, true);

//     fakeTelemetryPrompt.activate();


//     windowShowInformationMessageStub.called.should.be.false;
//   });

// });