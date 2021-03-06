import { getHTTPMethods, MultiStepInput } from "../utils";
import { ApplicationTreeItem } from "../views";

export interface RTCCapabilityState {
  title: string;
  step: number;
  totalSteps: number;
  event_url_address: string;
  event_url_http_method: string;
  event_url_connection_timeout: string;
  event_url_socket_timeout: string;
}

export abstract class RTCCapabilityFlow {

  static title: string = ''

  public static async collectInputs(title: string, existingState?: ApplicationTreeItem): Promise<RTCCapabilityState> {
    let state = {} as Partial<RTCCapabilityState>;
    this.title = title;

    if (existingState) {
      state.event_url_address = existingState.application.capabilities.rtc.webhooks.event_url.address;
      state.event_url_http_method = existingState.application.capabilities.rtc.webhooks.event_url.http_method;
    }

    await MultiStepInput.run(input => this.inputEventUrlAddress(input, state));
    return state as RTCCapabilityState;
  }

  private static async inputEventUrlAddress(input: MultiStepInput, state: Partial<RTCCapabilityState>) {
    state.event_url_address = await input.showInputBox({
      title: this.title,
      step: 1,
      totalSteps: 2,
      value: typeof state.event_url_address === 'string' ? state.event_url_address : '',
      prompt: 'Event Webhook Url',
      validate: this.validateAddress,
      shouldResume: this.shouldResume
    });
    return (input: MultiStepInput) => this.inputEventHttpMethod(input, state);
  }

  private static async inputEventHttpMethod(input: MultiStepInput, state: Partial<RTCCapabilityState>) {
    const result = await input.showQuickPick({
      title: this.title,
      step: 1,
      totalSteps: 2,
      placeholder: 'Event Webhook Http Method',
      items: getHTTPMethods(),
      activeItem: typeof state.event_url_http_method !== 'string' ? state.event_url_http_method : undefined,
      shouldResume: this.shouldResume,
    });
    state.event_url_http_method = result.label;
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

}