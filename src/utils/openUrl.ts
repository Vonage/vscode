import * as vscode from 'vscode';

/**
 * Opens a url in an external browser
 * @param url Url to open in the users browser
 */
export async function openUrl(url: string): Promise<void> {
  await vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(url));
}