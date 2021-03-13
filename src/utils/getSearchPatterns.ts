import { QuickPickItem } from 'vscode';

export function getSearchPatterns(): QuickPickItem[] {
  return ['Starts with', 'Contains', 'Ends with'].map((i) => {
    return {
      label: i,
    };
  });
} 