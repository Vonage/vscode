import * as vscode from 'vscode';
import { GoogleAnalyticsTelemetry, LocalTelemetry } from './telemetry';
import {
  AccountViewDataProvider,
  ApplicationViewDataProvider,
  HelpViewDataProvider,
  NumbersViewDataProvider
} from './views';
import {
  SurveyPrompt,
  TelemetryPrompt
} from './prompts';
import {
  AccountCommands,
  ApplicationCommands,
  AuthCommands,
  HelpCommands,
  NumbersCommands
} from './commands';
import { Auth } from './auth';
import { Credentials } from './models';
import { StorageKeys } from './enums';

let activeExtension: Extension;
let _context: vscode.ExtensionContext;

export class Extension {

  private onAuthStatusChangedEvent = new vscode.EventEmitter<Credentials>();
  
  /**
   * Activate the extension
   */
  activate = async () => {

    /**
     * Set a global context item `vonage:authenticated`. This
     * setting is used to determine what commands/views/etc are
     * available to the user. The credentials are also used
     * when making requests from the Vonage API.
     */
    const authenticated = await Auth.isAuthenticated();
    vscode.commands.executeCommand('setContext', 'vonage:authenticated', authenticated);
    
    /**
     * Notify user of telemetry collection on first use.
     */
    new TelemetryPrompt(_context.globalState).activate();

    /**
     * Activate telemetry.
     * Will only collect information if both global telemetry
     * and Vonage specific telemetry settings are allowed.
     */
    const telemetry = getTelemetry();
    telemetry.sendEvent('Activation', 'activate');


    /**
     * Potentially prompt user with CSAT survey
     */
    new SurveyPrompt(_context.globalState).activate();

    /**
     * Register commands & views
     */
    const applicationViewDataProvider = new ApplicationViewDataProvider();
    const accountViewDataProvider = new AccountViewDataProvider(_context.globalState);
    const numbersViewDataProvider = new NumbersViewDataProvider(_context.globalState);
    const helpViewDataProvider = new HelpViewDataProvider();
    const subscriptions = _context.subscriptions;

    new AuthCommands(subscriptions, telemetry);
    const applicationCommands = new ApplicationCommands(subscriptions, telemetry, applicationViewDataProvider);
    const accountCommands = new AccountCommands(subscriptions, telemetry, accountViewDataProvider);
    const numbersCommands = new NumbersCommands(subscriptions, telemetry, numbersViewDataProvider);
    const helpCommands = new HelpCommands(subscriptions, telemetry, helpViewDataProvider);

    /**
     * Register changes in authentication to update views
     * @param credentials 
     */
    const authStatusChanged = async (credentials: Credentials) => {
      applicationCommands.refreshAppsList();
      numbersCommands.refreshNumbersList();
      await accountCommands.refresh();
      await helpCommands.refresh();
    };

    Auth.onAuthStatusChanged(authStatusChanged);

    const numberAssignmentChanged = async () => {
      applicationCommands.refreshAppsList();
    };
    numbersViewDataProvider.onNumberAssignmentChanged(numberAssignmentChanged);

    /**
     * Register tree views within activity bar
     */
    vscode.window.createTreeView('vonageAppView', {
      treeDataProvider: applicationViewDataProvider,
      showCollapseAll: false,
    });
    vscode.window.createTreeView('vonageNumbersView', {
      treeDataProvider: numbersViewDataProvider,
      showCollapseAll: false,
    });
    vscode.window.createTreeView('vonageAccountView', {
      treeDataProvider: accountViewDataProvider,
      showCollapseAll: false,
    });
    vscode.window.createTreeView('vonageHelpView', {
      treeDataProvider: helpViewDataProvider,
      showCollapseAll: false,
    });
  }

  /**
   * Deactivate the extension. Due to uninstalling the
   * extension.
   */
  deactivate = async () => {
    /**
     * Sign out and dispose of all credentials 
     */
    Auth.logout();
    Auth.dispose();
  }
}

/**
 * Activates the extension in VS Code and registers commands available
 * in the command palette
 * @param context - Context the extension is being run in
 */
export async function activate(this: any, context: vscode.ExtensionContext) {
  _context = context;
  activeExtension = new Extension();
  activeExtension.activate();
}

/**
 * Deactivates the extension in VS Code
 */
export async function deactivate() {
  if (activeExtension) {
    await activeExtension.deactivate();
  }
}

/**
 * Checks for the explicit setting of the EXTENSION_MODE and
 * implicitly checks by using the magic session string. This session value is used whenever an extension
 * is running on a development host. https://github.com/microsoft/vscode/issues/10272
 */
function getTelemetry() {
  if (process.env.EXTENSION_MODE === 'development' || vscode.env.sessionId === 'someValue.sessionId') {
    return new LocalTelemetry();
  } else {
    return GoogleAnalyticsTelemetry.getInstance();
  }
}