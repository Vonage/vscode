import * as vscode from 'vscode';
import moment from 'moment';
import { StorageKeys } from '../enums';

/**
 * Prompt to request additional feedback in the
 * form of a survey on the learn.vonage.com site
 */
export class SurveyPrompt {
  private storage: vscode.Memento;

  constructor(state: vscode.Memento) {
    this.storage = state;
  }

  /**
   * Prompt user concerning the survey
   */
  public activate(): void {
    const show = this.shouldShowBanner();
    if (!show) {
      return;
    }

    /**
     * Wait 5 minutes to show survey to avoid showing upon initial activation.
     */
    setTimeout(this.showSurveyPrompt, 60 * 1000 * 5);
  }

  /**
   * Returns whether the user has requested to not
   * see this prompt again
   */
  public shouldShowBanner(): boolean {
    if (this.storage.get(StorageKeys.doNotShowSurveyPromptAgain)) {
      return false;
    }

    /**
     * Only sample people took the survey more than 12 weeks ago
     */
    const lastSurveyDateEpoch = this.storage.get(StorageKeys.lastSurveyDate) as number;

    if (lastSurveyDateEpoch) {
      const lastSurveyDate = moment(lastSurveyDateEpoch);
      const currentDate = moment();

      if (currentDate.diff(lastSurveyDate, 'weeks') < 12) {
        return false;
      }
    }

    /**
     * Only sample 20% of people to avoid spam
     */
    const randomSample: number = this.getRandomInt(100);
    if (randomSample >= 20) {
      return false;
    }

    return true;
  }

  /**
   * Requests the user fill out a survey with input on
   * the VS Code extension
   */
  private showSurveyPrompt = async () => {
    const prompts = ['Take survey', 'Maybe later', "Don't Show Again"];

    const selection = await vscode.window.showInformationMessage(
      'Got 2 minutes to tell us how the Vonage extension is working for you?',
      ...prompts,
    );

    if (!selection) {
      return;
    }

    if (selection === 'Take survey') {
      vscode.commands.executeCommand('vonage.openSurvey');
      const currentEpoch = moment().valueOf();
      this.storage.update(StorageKeys.lastSurveyDate, currentEpoch);
      this.storage.update(StorageKeys.doNotShowSurveyPromptAgain, false);
    } else if (selection === "Don't Show Again") {
      this.storage.update(StorageKeys.doNotShowSurveyPromptAgain, true);
    }
  };

  /**
   * Returns a random int up to the provided max
   * @param max Max number to return
   */
  getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}