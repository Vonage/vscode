import { QuickPickItem } from 'vscode';

export function getNumberTypes(): QuickPickItem[] {
  return ['Any', 'Mobile', 'Landline', 'Toll Free'].map((i) => {
    return {
      label: i,
      picked: i === 'Any'
    };
  });
}