import * as vscode from 'vscode';

const stateValues: { [key: string]: any } = {
  isStreaming: false
};

export const fakeMemento: vscode.Memento = {
  get(key: string): any {
    return stateValues[key];
  },
  update(key: string, value: any) {
    stateValues[key] = value;
    return Promise.resolve();
  }
};