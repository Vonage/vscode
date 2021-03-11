import * as vscode from 'vscode';
import { openUrl, showWarningMessage } from '../utils';
import { BaseTreeViewDataProvider } from './trees';
import { ApplicationTreeItem } from './trees';
import {
  CreateApplicationFlow,
  VoiceCapabilityFlow,
  RTCCapabilityFlow,
  MessageCapabilityFlow
} from '../steps';
import { VonageClient } from '../client/vonageClient';

export class ApplicationViewDataProvider extends BaseTreeViewDataProvider {

  async buildTree(): Promise<ApplicationTreeItem[]> {
    const applications = await VonageClient.application.getApplications();
    return Promise.resolve(applications.map((app: any) => {
      return new ApplicationTreeItem(app);
    }));
  }

  /** Application Commands */

  async linkApplication(node: ApplicationTreeItem): Promise<void> {
    await openUrl(`https://dashboard.nexmo.com/applications/${node.application.id}`);
  }

  async createApplication(): Promise<void> {

    const state = await CreateApplicationFlow.collectInputs();

    const createResult = await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `Creating application "${state.name}"...`
    }, async () => {
      return await VonageClient.application.createApplication(state);
    });

    if (createResult) {
      this.refresh();
      vscode.window.showInformationMessage(`Successfully created application "${state.name}".`);
    }
  }

  async updateApplication(node: ApplicationTreeItem): Promise<void> {

    const state = await CreateApplicationFlow.collectInputs();

    const application = node.application;
    application.name = state.name;
    application.public_key = state.public_key;

    const updateResult = await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `Updating application "${state.name}"...`
    }, async () => {
      return await VonageClient.application.updateApplication(application);
    });

    if (updateResult) {
      this.refresh();
      vscode.window.showInformationMessage(`Successfully updated application "${state.name}".`);
    }
  }

  async deleteApplication(node: ApplicationTreeItem): Promise<void> {

    const confirmDelete = `Are you sure you want to delete application "${node.label}"? This cannot be undone.`;

    const result = await showWarningMessage(confirmDelete, undefined, { modal: true }, { title: 'Delete' });

    if (result === true) {

      const deleteResult = await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Deleting application "${node.label}"...`
      }, async () => {
        return await VonageClient.application.deleteApplication(node);
      });

      if (deleteResult) {
        this.refresh();
        vscode.window.showInformationMessage(`Successfully deleted application "${node.label}".`);
      }
    } else {
      return;
    }

  }

  /** Voice Commands */

  async addVoice(node: ApplicationTreeItem): Promise<void> {
    const state = await VoiceCapabilityFlow.collectInputs(`Add Voice Capability to application ${node.label}`,);

    const application = node.application;

    application.capabilities.voice =
    {
      webhooks: {
        answer_url: {
          address: state.answer_url_address,
          http_method: state.answer_url_http_method,
        },
        fallback_answer_url: {
          address: state.fallback_answer_url_address,
          http_method: state.fallback_answer_url_http_method,
        },
        event_url: {
          address: state.event_url_address,
          http_method: state.event_url_http_method,
        }
      }
    };

    const updateResult = await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `Adding voice capability to application "${application.name}"...`
    }, async () => {
      return await VonageClient.application.updateApplication(application);
    });

    if (updateResult) {
      this.refresh();
      vscode.window.showInformationMessage(`Successfully added voice to application "${application.name}".`);
    }
  }

  async updateVoice(node: ApplicationTreeItem): Promise<void> {
    const state = await VoiceCapabilityFlow.collectInputs(`Update Voice Capability for application ${node.label}`, node);


    const application = node.application;

    application.capabilities.voice =
    {
      webhooks: {
        answer_url: {
          address: state.answer_url_address,
          http_method: state.answer_url_http_method,
          // connection_timeout: parseInt(state.answer_url_connection_timeout),
          // socket_timeout: parseInt(state.answer_url_socket_timeout)
        },
        fallback_answer_url: {
          address: state.fallback_answer_url_address,
          http_method: state.fallback_answer_url_http_method,
          // connection_timeout: parseInt(state.fallback_answer_url_connection_timeout),
          // socket_timeout: parseInt(state.fallback_answer_url_socket_timeout)
        },
        event_url: {
          address: state.event_url_address,
          http_method: state.event_url_http_method,
          // connection_timeout: parseInt(state.event_url_connection_timeout),
          // socket_timeout: parseInt(state.event_url_socket_timeout)
        }
      }
    };

    const updateResult = await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `Updating voice capability to application "${application.name}"...`
    }, async () => {
      return await VonageClient.application.updateApplication(application);
    });

    if (updateResult) {
      this.refresh();
      vscode.window.showInformationMessage(`Successfully update voice to application "${application.name}".`);
    }
  }

  async deleteVoice(node: ApplicationTreeItem): Promise<void> {

    const confirmDelete = `Are you sure you want to disable voice capabilities on application "${node.label}"?`;

    const result = await showWarningMessage(confirmDelete, undefined, { modal: true }, { title: 'Disable' });

    const application = node.application;
    delete application.capabilities.voice;

    if (result === true) {

      const deleteResult = await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Disabling voice capabilities on application "${node.label}"...`
      }, async () => {
        return await VonageClient.application.updateApplication(application);
      });

      if (deleteResult) {
        this.refresh();
        vscode.window.showInformationMessage(`Successfully disabled voice on application "${node.label}".`);
      }
    } else {
      return;
    }

  }

  /** RTC Commands */

  async addRTC(node: ApplicationTreeItem): Promise<void> {
    const state = await RTCCapabilityFlow.collectInputs(`Add RTC Capability to application ${node.label}`,);

    const application = node.application;

    application.capabilities.rtc =
    {
      webhooks: {
        event_url: {
          address: state.event_url_address,
          http_method: state.event_url_http_method,
        }
      }
    };

    const updateResult = await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `Adding RTC capability to application "${application.name}"...`
    }, async () => {
      return await VonageClient.application.updateApplication(application);
    });

    if (updateResult) {
      this.refresh();
      vscode.window.showInformationMessage(`Successfully added RTC to application "${application.name}".`);
    }
  }

  async updateRTC(node: ApplicationTreeItem): Promise<void> {
    const state = await RTCCapabilityFlow.collectInputs(`Update RTC Capability for application ${node.label}`, node);

    const application = node.application;

    application.capabilities.rtc =
    {
      webhooks: {
        event_url: {
          address: state.event_url_address,
          http_method: state.event_url_http_method,
        }
      }
    };

    const updateResult = await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `Updating RTC capability to application "${application.name}"...`
    }, async () => {
      return await VonageClient.application.updateApplication(application);
    });

    if (updateResult) {
      this.refresh();
      vscode.window.showInformationMessage(`Successfully update RTC to application "${application.name}".`);
    }
  }

  async deleteRTC(node: ApplicationTreeItem): Promise<void> {

    const confirmDelete = `Are you sure you want to disable RTC capabilities on application "${node.label}"?`;

    const result = await showWarningMessage(confirmDelete, undefined, { modal: true }, { title: 'Disable' });

    const application = node.application;
    delete application.capabilities.rtc;

    if (result === true) {

      const deleteResult = await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Disabling RTC capabilities on application "${node.label}"...`
      }, async () => {
        return await VonageClient.application.updateApplication(application);
      });

      if (deleteResult) {
        this.refresh();
        vscode.window.showInformationMessage(`Successfully disabled RTC on application "${node.label}".`);
      }
    } else {
      return;
    }

  }

  /** Messages Commands */

  async addMessages(node: ApplicationTreeItem): Promise<void> {
    const state = await MessageCapabilityFlow.collectInputs(`Add Messages Capability to application ${node.label}`,);

    const application = node.application;

    application.capabilities.messages =
    {
      webhooks: {
        inbound_url: {
          address: state.inbound_url_address,
          http_method: state.inbound_url_http_method,
        },
        status_url: {
          address: state.inbound_url_address,
          http_method: state.inbound_url_http_method,
        }
      }
    };

    const updateResult = await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `Adding Messages capability to application "${application.name}"...`
    }, async () => {
      return await VonageClient.application.updateApplication(application);
    });

    if (updateResult) {
      this.refresh();
      vscode.window.showInformationMessage(`Successfully added Messages to application "${application.name}".`);
    }
  }

  async updateMessages(node: ApplicationTreeItem): Promise<void> {
    const state = await MessageCapabilityFlow.collectInputs(`Update Messages Capability on application ${node.label}`,);

    const application = node.application;

    application.capabilities.messages =
    {
      webhooks: {
        inbound_url: {
          address: state.inbound_url_address,
          http_method: state.inbound_url_http_method,
        },
        status_url: {
          address: state.inbound_url_address,
          http_method: state.inbound_url_http_method,
        }
      }
    };

    const updateResult = await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `Updating Messages capability to application "${application.name}"...`
    }, async () => {
      return await VonageClient.application.updateApplication(application);
    });

    if (updateResult) {
      this.refresh();
      vscode.window.showInformationMessage(`Successfully update Messages to application "${application.name}".`);
    }
  }

  async deleteMessages(node: ApplicationTreeItem): Promise<void> {

    const confirmDelete = `Are you sure you want to disable Messages capabilities on application "${node.label}"?`;

    const result = await showWarningMessage(confirmDelete, undefined, { modal: true }, { title: 'Disable' });

    const application = node.application;
    delete application.capabilities.messages;

    if (result === true) {

      const deleteResult = await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Disabling Messages capabilities on application "${node.label}"...`
      }, async () => {
        return await VonageClient.application.updateApplication(application);
      });

      if (deleteResult) {
        this.refresh();
        vscode.window.showInformationMessage(`Successfully disabled Messages on application "${node.label}".`);
      }
    } else {
      return;
    }

  }

  /** VBC Commands */

  async addVBC(node: ApplicationTreeItem): Promise<void> {

    const application = node.application;

    application.capabilities.vbc =
    {
    };

    const updateResult = await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `Adding VBC capability to application "${application.name}"...`
    }, async () => {
      return await VonageClient.application.updateApplication(application);
    });

    if (updateResult) {
      this.refresh();
      vscode.window.showInformationMessage(`Successfully added VBC to application "${application.name}".`);
    }
  }

  async deleteVBC(node: ApplicationTreeItem): Promise<void> {

    const confirmDelete = `Are you sure you want to disable VBC capabilities on application "${node.label}"?`;

    const result = await showWarningMessage(confirmDelete, undefined, { modal: true }, { title: 'Disable' });

    const application = node.application;
    delete application.capabilities.vbc;

    if (result === true) {

      const deleteResult = await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Disabling VBC capabilities on application "${node.label}"...`
      }, async () => {
        return await VonageClient.application.updateApplication(application);
      });

      if (deleteResult) {
        this.refresh();
        vscode.window.showInformationMessage(`Successfully disabled VBC on application "${node.label}".`);
      }
    } else {
      return;
    }

  }
}