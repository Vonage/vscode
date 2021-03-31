import Sinon from 'sinon';
import chai from 'chai';
import moment from 'moment';
import { SurveyPrompt } from '../../../src/prompts';
import { StorageKeys } from '../../../src/enums';
import { TestMemento } from '../../mocks';

chai.should();

suite('Prompt:Survey', function () {

  const storage = new TestMemento();
  let surveyPrompt: SurveyPrompt;

  this.beforeEach(function() {
    storage.storage = new Map();
    surveyPrompt = new SurveyPrompt(storage);
  });

  test(`should not show if user selected to never show again`, async function () {
    await storage.update(StorageKeys.doNotShowSurveyPromptAgain, true);

    const shouldShow = surveyPrompt.shouldShowBanner();

    shouldShow.should.eq(false);
  });

  test(`should not show if user has seen message within past 12 weeks`, async function () {
    const getStorageStub = Sinon.stub(storage, 'get');

    const currentEpoch = moment().valueOf();
    await storage.update(StorageKeys.lastSurveyDate, currentEpoch);

    const shouldShow = surveyPrompt.shouldShowBanner();
    shouldShow.should.eq(false);
    getStorageStub.called.should.be.true;

    getStorageStub.restore();
  });

  test(`should not show if not in 20% sampling`, function () {
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

  test(`should show if in 20% sampling`, function () {
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