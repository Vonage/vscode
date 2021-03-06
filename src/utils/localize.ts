import * as nls from 'vscode-nls';

export function localize(content: string): string {
  let localizer = nls.loadMessageBundle();

  return localizer('keyOne', "Hello World");

}
