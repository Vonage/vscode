import * as vscode from 'vscode';
import * as querystring from 'querystring';
import osName from 'os-name';
import { Telemetry } from "../telemetry";
import { getExtensionInfo } from '../utils';
import { HelpViewDataProvider } from '../views';

export class HelpCommands {

  constructor(
    subscriptions: { dispose(): any }[],
    private telemetry: Telemetry,
    private vonageHelpViewDataProvider: HelpViewDataProvider) {

    subscriptions.push(vscode.commands.registerCommand('vonage.help.openDocs', this.openDocs));
    subscriptions.push(vscode.commands.registerCommand('vonage.help.openReportIssue', this.openReportIssue));
    subscriptions.push(vscode.commands.registerCommand('vonage.help.openSurvey', this.openSurvey));
    subscriptions.push(vscode.commands.registerCommand('vonage.help.openTelemetryInfo', this.openTelemetryInfo));
  }

  refresh = async () => {
    this.telemetry.sendEvent('Help', 'help.refresh');
    this.vonageHelpViewDataProvider.refresh();
  }

  /**
   * Opens Vonage developer portal.
   * Ideally will open documentation for the extension. 
   */
  openDocs = () => {
    this.telemetry.sendEvent('Help', 'help.openDocs');
    vscode.env.openExternal(vscode.Uri.parse('https://developer.nexmo.com'));
  };

  /**
   * Opens the VS Code report interface for users
   * to provide feedback on the extension.
   */
  openReportIssue = () => {
    this.telemetry.sendEvent('Help', 'help.openReportIssue');
    const { name, publisher } = getExtensionInfo();

    vscode.commands.executeCommand('vscode.openIssueReporter', {
      extensionId: `${publisher}.${name}`,
    });
  };

  /**
   * Opens a survey on the Vonage site that allows
   * users to provide feedback on the extension.
   */
  openSurvey = () => {
    this.telemetry.sendEvent('Help', 'help.openSurvey');
    const extensionInfo = getExtensionInfo();
    const query = querystring.stringify({
      platform: encodeURIComponent(osName()),
      vscodeVersion: encodeURIComponent(vscode.version),
      extensionVersion: encodeURIComponent(extensionInfo.version),
      machineId: encodeURIComponent(vscode.env.machineId),
    });

    const url = `https://docs.google.com/forms/d/e/1FAIpQLSffDoFTsYla2wMKk83x2TECXTYkixrIHVnoPTnIE7ft-hyu5A/viewform?usp=sf_link&${query}`;
    vscode.env.openExternal(vscode.Uri.parse(url));
  };

  /**
   * Open the VS Code documentation on telemetry so
   * the user can learn more.
   */
  openTelemetryInfo = () => {
    this.telemetry.sendEvent('Help', 'help.openTelemetryInfo');
    vscode.env.openExternal(
      vscode.Uri.parse('https://code.visualstudio.com/docs/getstarted/telemetry'),
    );
  };
}