import * as vscode from 'vscode';
import { Telemetry } from "../telemetry";
import { ApplicationTreeItem, ApplicationViewDataProvider } from "../views";

export class ApplicationCommands {

  constructor(
    subscriptions: { dispose(): any }[],
    private telemetry: Telemetry,
    private vonageApplicationViewDataProvider: ApplicationViewDataProvider) {

    subscriptions.push(vscode.commands.registerCommand('vonage.app.addApp', this.addApp));
    subscriptions.push(vscode.commands.registerCommand('vonage.app.updateApp', this.updateApp));

    subscriptions.push(vscode.commands.registerCommand('vonage.app.deleteApp', this.deleteApp));
    subscriptions.push(vscode.commands.registerCommand('vonage.app.refreshAppsList', this.refreshAppsList));
    subscriptions.push(vscode.commands.registerCommand('vonage.app.link', this.linkApp));

    subscriptions.push(vscode.commands.registerCommand('vonage.app.voice.add', this.voiceAdd));
    subscriptions.push(vscode.commands.registerCommand('vonage.app.voice.update', this.voiceUpdate));
    subscriptions.push(vscode.commands.registerCommand('vonage.app.voice.delete', this.voiceDelete));

    subscriptions.push(vscode.commands.registerCommand('vonage.app.rtc.add', this.rtcAdd));
    subscriptions.push(vscode.commands.registerCommand('vonage.app.rtc.update', this.rtcUpdate));
    subscriptions.push(vscode.commands.registerCommand('vonage.app.rtc.delete', this.rtcDelete));

    subscriptions.push(vscode.commands.registerCommand('vonage.app.messages.add', this.messagesAdd));
    subscriptions.push(vscode.commands.registerCommand('vonage.app.messages.update', this.messagesUpdate));
    subscriptions.push(vscode.commands.registerCommand('vonage.app.messages.delete', this.messagesDelete));

    subscriptions.push(vscode.commands.registerCommand('vonage.app.vbc.add', this.vbcAdd));
    subscriptions.push(vscode.commands.registerCommand('vonage.app.vbc.delete', this.vbcDelete));
  }

  /** Application commands */
  refreshAppsList = () => {
    this.telemetry.sendEvent('Applications', 'app.refreshAppsList');
    this.vonageApplicationViewDataProvider.refresh();
  };

  addApp = () => {
    this.telemetry.sendEvent('Applications', 'app.addApp');
    this.vonageApplicationViewDataProvider.createApplication();
  };

  updateApp = (node?: ApplicationTreeItem) => {
    this.telemetry.sendEvent('Applications', 'app.updateApp');
    if (node) {
      this.vonageApplicationViewDataProvider.updateApplication(node);
    }
  };

  deleteApp = (node?: ApplicationTreeItem) => {
    this.telemetry.sendEvent('Applications', 'app.deleteApp');
    if (node) {
      this.vonageApplicationViewDataProvider.deleteApplication(node);
    }
  };

  linkApp = (node?: ApplicationTreeItem) => {
    this.telemetry.sendEvent('Applications', 'app.link');
    if (node) {
      this.vonageApplicationViewDataProvider.linkApplication(node);
    }
  };

  /** Voice commands */

  voiceAdd = (node?: ApplicationTreeItem) => {
    this.telemetry.sendEvent('Applications', 'app.voice.add');
    if (node) {
      this.vonageApplicationViewDataProvider.addVoice(node);
    }
  };

  voiceUpdate = (node?: ApplicationTreeItem) => {
    this.telemetry.sendEvent('Applications', 'app.voice.update');
    if (node) {
      this.vonageApplicationViewDataProvider.updateVoice(node);
    }
  };

  voiceDelete = (node?: ApplicationTreeItem) => {
    this.telemetry.sendEvent('Applications', 'app.voice.delete');
    if (node) {
      this.vonageApplicationViewDataProvider.deleteVoice(node);
    }
  };

  /** RTC commands */

  rtcAdd = (node?: ApplicationTreeItem) => {
    this.telemetry.sendEvent('Applications', 'app.rtc.add');
    if (node) {
      this.vonageApplicationViewDataProvider.addRTC(node);
    }
  };

  rtcUpdate = (node?: ApplicationTreeItem) => {
    this.telemetry.sendEvent('Applications', 'app.rtc.update');
    if (node) {
      this.vonageApplicationViewDataProvider.updateRTC(node);
    }
  };

  rtcDelete = (node?: ApplicationTreeItem) => {
    this.telemetry.sendEvent('Applications', 'app.rtc.delete');
    if (node) {
      this.vonageApplicationViewDataProvider.deleteRTC(node);
    }
  };

  /** Messages commands */

  messagesAdd = (node?: ApplicationTreeItem) => {
    this.telemetry.sendEvent('Applications', 'app.messages.add');
    if (node) {
      this.vonageApplicationViewDataProvider.addMessages(node);
    }
  };

  messagesUpdate = (node?: ApplicationTreeItem) => {
    this.telemetry.sendEvent('Applications', 'app.messages.update');
    if (node) {
      this.vonageApplicationViewDataProvider.updateMessages(node);
    }
  };

  messagesDelete = (node?: ApplicationTreeItem) => {
    this.telemetry.sendEvent('Applications', 'app.messages.delete');
    if (node) {
      this.vonageApplicationViewDataProvider.deleteMessages(node);
    }
  };

  /** VBC commands */

  vbcAdd = (node?: ApplicationTreeItem) => {
    this.telemetry.sendEvent('Applications', 'app.vbc.add');
    if (node) {
      this.vonageApplicationViewDataProvider.addVBC(node);
    }
  };

  vbcDelete = (node?: ApplicationTreeItem) => {
    this.telemetry.sendEvent('Applications', 'app.vbc.delete');
    if (node) {
      this.vonageApplicationViewDataProvider.deleteVBC(node);
    }
  };
}