import { MessageItem, window } from 'vscode';
import { openUrl } from './openUrl';

namespace DialogResponses {
  export const yes: MessageItem = { title: 'Yes' };
  export const no: MessageItem = { title: 'No' };
  export const cancel: MessageItem = { title: 'Cancel' };
  export const deleteResponse: MessageItem = { title: 'Delete' };
  export const learnMore: MessageItem = { title: 'Learn more' };
}

/**
 * Extends the VS Code warning message window to optionally
 * provide a learn more link to the user and handle opening
 * the url upon click by the user
 * @param message Message to display to the user
 * @param learnMoreLink Optional url to provide as a "learn more" link
 * @param args Optional arguments to provide the built-in VS Code warning message
 */
export async function showWarningMessage(message: string, learnMoreLink?: string, ...args: any[]): Promise<boolean> {
  if (learnMoreLink) {
    args.push(DialogResponses.learnMore);
  }

  const result = await window.showWarningMessage(message, ...args);
  if (learnMoreLink && result === DialogResponses.learnMore) {
    await openUrl(learnMoreLink);
    return false;
  } else if (result === undefined) {
    return false;
  } else {
    return true;
  }
}