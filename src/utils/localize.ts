import * as nls from 'vscode-nls';

export function localize(content: string): string {
  const localizer = nls.loadMessageBundle();

  return localizer('keyOne', "Hello World");
}
