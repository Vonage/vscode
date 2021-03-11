import { MultiStepInput } from "../utils";
import { ApplicationTreeItem } from "../views";

export interface MessageCapabilityState {
  title: string;
  step: number;
  totalSteps: number;
  name: string;
  public_key: string;
  inbound_url_address: string;
  inbound_url_http_method: string;
  status_url_address: string;
  status_url_http_method: string;
}

export abstract class MessageCapabilityFlow {

  private static title = '';

  public static async collectInputs(title: string, existingState?: ApplicationTreeItem): Promise<MessageCapabilityState> {
    const state = {} as Partial<MessageCapabilityState>;
    this.title = title;
    state.inbound_url_http_method = 'POST';
    state.status_url_http_method = 'POST';

    if (existingState) {
      state.inbound_url_address = existingState.application.capabilities.voice.webhooks.inbound_url.address;
      state.inbound_url_http_method = existingState.application.capabilities.voice.webhooks.inbound_url.http_method;
      state.status_url_address = existingState.application.capabilities.voice.webhooks.status_url.address;
      state.status_url_http_method = existingState.application.capabilities.voice.webhooks.status_url.http_method;
    }

    await MultiStepInput.run(input => this.inputInboundUrlAddress(input, state));
    return state as MessageCapabilityState;
  }

  private static async inputInboundUrlAddress(input: MultiStepInput, state: Partial<MessageCapabilityState>) {
    state.inbound_url_address = await input.showInputBox({
      title: this.title,
      step: 1,
      totalSteps: 2,
      value: typeof state.inbound_url_address === 'string' ? state.inbound_url_address : '',
      prompt: 'Inbound Webhook Url',
      validate: this.validateAddress,
      shouldResume: this.shouldResume
    });
    return (input: MultiStepInput) => this.statusUrlAddress(input, state);
  }

  private static async statusUrlAddress(input: MultiStepInput, state: Partial<MessageCapabilityState>) {
    state.status_url_address = await input.showInputBox({
      title: this.title,
      step: 2,
      totalSteps: 2,
      value: typeof state.status_url_address === 'string' ? state.status_url_address : '',
      prompt: 'Status Webhook Url',
      validate: this.validateAddress,
      shouldResume: this.shouldResume
    });
  }


  private static shouldResume() {
    // Could show a notification with the option to resume.
    return new Promise<boolean>((resolve, reject) => {
      // noop
    });
  }

  private static async validateAddress(address: string) {
    return (address && address.trim().length > 0) ? undefined : 'Address is required';
  }

  private static async validateConnectionTimeout(timeout?: string) {
    if (!timeout) {
      return 'Connection timeout is required.';
    }
    let timeoutValue = 0;
    try {
      timeoutValue = parseInt(timeout);
    } catch (err) {
      return 'Connection timeout must be numeric';
    }

    if (timeoutValue < 300 || timeoutValue > 1000) {
      return 'Connection timeout must be between 300 and 1000';
    }
  }

  private static async validateSocketTimeout(timeout?: string) {
    if (!timeout) {
      return 'Socket timeout is required.';
    }
    let timeoutValue = 0;
    try {
      timeoutValue = parseInt(timeout);
    } catch (err) {
      return 'Socket timeout must be numeric';
    }

    if (timeoutValue < 1000 || timeoutValue > 5000) {
      return 'Socket timeout must be between 1000 and 5000';
    }
  }
}