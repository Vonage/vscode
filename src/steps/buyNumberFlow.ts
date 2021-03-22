import * as vscode from 'vscode';
import { VonageClient } from "../client/vonageClient";
import { StorageKeys } from '../enums';
import { getCountries, getNumberTypes, getSearchPatterns, MultiStepInput } from "../utils";

export interface BuyNumberState {
  title: string;
  step: number;
  totalSteps: number;
  country: string,
  type?: string,
  pattern?: any,
  search_pattern?: number,
  msisdn: string
}

const title = 'Find Number to Buy';

export abstract class BuyNumberFlow {
  private static storage: vscode.Memento;

  public static async collectInputs(storage: vscode.Memento): Promise<BuyNumberState> {
    this.storage = storage;
    const state = {} as Partial<BuyNumberState>;
    await MultiStepInput.run(input => this.selectCountry(input, state));
    return state as BuyNumberState;
  }

  private static async selectCountry(input: MultiStepInput, state: Partial<BuyNumberState>) {
    const countries = getCountries(this.storage).sort((a,b) => {
      return (a.picked === b.picked) ? 0 : a.picked ? -1 : 1;
    });
    
    const result = await input.showQuickPick({
      title: title,
      step: 1,
      totalSteps: 3,
      placeholder: 'Choose Country',
      items: countries,
      shouldResume: this.shouldResume,
    });
    state.country = result.description;
    this.storage.update(StorageKeys.lastCountrySelected, result.description);
    return (input: MultiStepInput) => this.selectNumberType(input, state);
  }

  private static async selectNumberType(input: MultiStepInput, state: Partial<BuyNumberState>) {
    const result = await input.showQuickPick({
      title: title,
      step: 2,
      totalSteps: 3,
      placeholder: 'Select Type',
      items: getNumberTypes(),
      shouldResume: this.shouldResume,
    });
    let type = undefined;
    switch (result.label) {
      case 'Mobile':
        type = 'mobile-lvn';
        break;
      case 'Landline':
        type = 'landline';
        break;
      case 'Toll Free':
        type = 'landline-toll-free';
        break;
    }
    state.type = type;
    return (input: MultiStepInput) => this.selectNumber(input, state);
  }

  // private static async selectPatternType(input: MultiStepInput, state: Partial<BuyNumberState>) {
  //   const result = await input.showQuickPick({
  //     title: title,
  //     step: 3,
  //     totalSteps: 5,
  //     placeholder: 'Search Pattern',
  //     items: getSearchPatterns(),
  //     shouldResume: this.shouldResume,
  //   });
  //   let pattern = undefined;
  //   switch (result.label) {
  //     case 'Starts with':
  //       pattern = 0;
  //       break;
  //     case 'Contains':
  //       pattern = 1;
  //       break;
  //     case 'Ends with':
  //       pattern = 2;
  //       break;
  //   }
  //   state.search_pattern = pattern;
  //   return (input: MultiStepInput) => this.selectPattern(input, state);
  // }

  // private static async selectPattern(input: MultiStepInput, state: Partial<BuyNumberState>) {
  //   const result = await input.showInputBox({
  //     title,
  //     step: 4,
  //     totalSteps: 5,
  //     value: '',
  //     prompt: 'Pattern to match (Note: all numbers are in E.164 format, so the starting pattern includes the country code, such as 1 for USA)',
  //     validate: this.validateNumber,
  //     shouldResume: this.shouldResume
  //   });
  //   if (result && result.length > 0) {
  //     state.pattern = result;
  //   }
  //   return (input: MultiStepInput) => this.selectNumber(input, state);
  // }

  private static async selectNumber(input: MultiStepInput, state: Partial<BuyNumberState>) {

    const numbers = await VonageClient.numbers.searchNumbers(state);

    const result = await input.showQuickPick({
      title: title,
      step: 3,
      totalSteps: 3,
      placeholder: 'Choose Number',
      items: numbers.map((a: any) => {
        return {
          label: a.msisdn,
          detail: a.features.join(', ')
        };
      }),
      shouldResume: this.shouldResume,
    });
    state.msisdn = result.label;
  }

  private static shouldResume() {
    // Could show a notification with the option to resume.
    return new Promise<boolean>((resolve, reject) => {
      // noop
    });
  }

  private static async validateNumber(number: any) {
    if (number.length === 0) {
      return undefined;
    }
    const parsed = Number.parseInt(number);
    if (Number.isNaN(parsed)) {
      return 'Can only contain numbers';
    }
    return undefined;
  }
}
