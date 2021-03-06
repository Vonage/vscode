import * as vscode from 'vscode';

const extensionConfig: { [key: string]: any } = {
  "autoConnect": false
};

/**
 * Fake workspace for use in tests
 */
export const fakeWorkspaceConfiguration: vscode.WorkspaceConfiguration = {
  get<T>(section: string, defaultValue?: T): T | undefined {
    return extensionConfig[section] || defaultValue;
  },
  has(section: string): boolean {
    return Object.keys(extensionConfig).some(c => c === section);
  },
  inspect(section: string) {
    return undefined;
  },
  update<T>(section: string, value: T, configurationTarget?: vscode.ConfigurationTarget | boolean) {
    extensionConfig[section] = value;
    return Promise.resolve();
  }
};
