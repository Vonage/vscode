import { QuickPickItem } from 'vscode';

export function getHTTPMethods(): QuickPickItem[] {
  return ['GET', 'POST'].map((i) => {
    return {
      label: i,
    };
  });
}