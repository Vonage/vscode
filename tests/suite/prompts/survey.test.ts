import Sinon from 'sinon';
import chai from 'chai';
import moment from 'moment';
import { SurveyPrompt } from '../../../src/prompts';
import { StorageKeys } from '../../../src/enums';
import { TestMemento } from '../../mocks';

chai.should();

suite('Survey Prompt Tests', function () {

  const storage = new TestMemento();
  const getStorageStub = Sinon.stub(storage, 'get');
  const surveyPrompt = new SurveyPrompt(storage);

  this.beforeEach(function() {
    storage.storage = new Map();
    getStorageStub.resetHistory();
    storage.update(StorageKeys.doNotShowSurveyPromptAgain, false);
  });

  this.afterAll(function() {
    getStorageStub.restore();
  });

  test(`Should not show if user selected to never show again`, function () {
    storage.update(StorageKeys.doNotShowSurveyPromptAgain, true);

    const shouldShow = surveyPrompt.shouldShowBanner();

    shouldShow.should.eq(false);
  });

  test(`Should not show if user has seen message within past 12 weeks`, function () {
    const currentEpoch = moment().valueOf();
    storage.update(StorageKeys.lastSurveyDate, currentEpoch);

    const shouldShow = surveyPrompt.shouldShowBanner();
    shouldShow.should.eq(false);
    getStorageStub.called.should.be.true;
  });

  test(`Should not show if not in 20% sampling`, function () {
    const getRandomIntStub = Sinon
      .stub(surveyPrompt, 'getRandomInt')
      .callsFake((max: number): number => {
        return 80;
      });

    const shouldShow = surveyPrompt.shouldShowBanner();
    shouldShow.should.eq(false);
    getRandomIntStub.calledOnce.should.be.true;
    getRandomIntStub.restore();
  });

  test(`Should show if in 20% sampling`, function () {
    const getRandomIntStub = Sinon
      .stub(surveyPrompt, 'getRandomInt')
      .callsFake((max: number): number => {
        return 10;
      });

    const shouldShow = surveyPrompt.shouldShowBanner();
    shouldShow.should.eq(true);
    getRandomIntStub.calledOnce.should.be.true;
    getRandomIntStub.restore();
  });
});