// // tslint:disable: no-unused-expression
// import * as vscode from 'vscode';
// // import * as sinon from 'sinon';
// // import * as chai from 'chai';
// import moment from 'moment';
// // import { fakeMemento, fakeWorkspaceConfiguration } from '../../../../.github/fakes';
// import { StorageKeys } from '../../../enums';
// import { SurveyPrompt } from '../../../prompts';

// // chai.should();

// suite('Survey Prompt Tests', function () {
//   // let fakeState: vscode.Memento;
//   // let fakeWorkspaceConfig: vscode.WorkspaceConfiguration;
//   // let fakeSurveyPrompt: SurveyPrompt;
//   // let getConfigurationStub: sinon.SinonStub<[(string | undefined)?, (vscode.Uri | null | undefined)?], vscode.WorkspaceConfiguration>;

//   // suiteSetup(function () {
//   //   fakeState = fakeMemento;
//   //   fakeWorkspaceConfig = fakeWorkspaceConfiguration;
//   // });

//   // suiteTeardown(function () {
//   //   getConfigurationStub.restore();
//   // });

//   // setup(async function () {
//   //   getConfigurationStub.resetHistory();
//   //   fakeState.update(StorageKeys.doNotShowSurveyPromptAgain, false);
//   //   fakeState.update(StorageKeys.lastSurveyDate, undefined);
//   //   fakeSurveyPrompt = new SurveyPrompt(fakeState);
//   // });

//   // test(`Should not show if user selected to never show again`, async function () {
//   //   fakeState.update(StorageKeys.doNotShowSurveyPromptAgain, true);

//   //   const getStorageStub = sinon.stub(fakeState, 'get');

//   //   const shouldShow = fakeSurveyPrompt.shouldShowBanner();
//   //   sinon.assert.match(shouldShow, false);
//   //   getStorageStub.notCalled.should.be.true;
//   // });

//   // test(`Should not show if user has seen message within past 12 weeks`, async function () {
//   //   const currentEpoch = moment().valueOf();
//   //   this.storage.update(StorageKeys.lastSurveyDate, currentEpoch);

//   //   const getStorageStub = sinon.stub(fakeState, 'get');

//   //   const shouldShow = fakeSurveyPrompt.shouldShowBanner();
//   //   sinon.assert.match(shouldShow, false);
//   //   getStorageStub.called.should.be.true;
//   // });

//   // test(`Should not show if not in 20% sampling`, async function () {
//   //   const getRandomIntStub = sinon
//   //     .stub(fakeSurveyPrompt, 'getRandomInt')
//   //     .callsFake((max: number): number => {
//   //       return 80;
//   //     });

//   //   const shouldShow = fakeSurveyPrompt.shouldShowBanner();
//   //   sinon.assert.match(shouldShow, false);
//   //   getRandomIntStub.calledOnce.should.be.true;
//   // });

//   // test(`Should show if in 20% sampling`, async function () {
//   //   const getRandomIntStub = sinon
//   //     .stub(fakeSurveyPrompt, 'getRandomInt')
//   //     .callsFake((max: number): number => {
//   //       return 10;
//   //     });

//   //   const shouldShow = fakeSurveyPrompt.shouldShowBanner();
//   //   sinon.assert.match(shouldShow, true);
//   //   getRandomIntStub.calledOnce.should.be.true;
//   // });
// });