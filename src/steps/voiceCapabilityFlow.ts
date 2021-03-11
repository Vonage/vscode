import { getHTTPMethods, MultiStepInput } from "../utils";
import { ApplicationTreeItem } from "../views";

export interface VoiceCapabilityState {
  title: string;
  step: number;
  totalSteps: number;
  name: string;
  public_key: string;
  answer_url_address: string;
  answer_url_http_method: string;
  fallback_answer_url_address: string;
  fallback_answer_url_http_method: string;
  event_url_address: string;
  event_url_http_method: string;
}

export abstract class VoiceCapabilityFlow {

  private static title = '';

  public static async collectInputs(title: string, existingState?: ApplicationTreeItem): Promise<VoiceCapabilityState> {
    const state = {} as Partial<VoiceCapabilityState>;
    this.title = title;

    if (existingState) {
      state.answer_url_address = existingState.application.capabilities.voice.webhooks.answer_url.address;
      state.answer_url_http_method = existingState.application.capabilities.voice.webhooks.answer_url.http_method;
      state.fallback_answer_url_address = existingState.application.capabilities.voice.webhooks.fallback_answer_url.address;
      state.fallback_answer_url_http_method = existingState.application.capabilities.voice.webhooks.fallback_answer_url.http_method;
      state.event_url_address = existingState.application.capabilities.voice.webhooks.event_url.address;
      state.event_url_http_method = existingState.application.capabilities.voice.webhooks.event_url.http_method;
    }


    await MultiStepInput.run(input => this.inputAnswerUrlAddress(input, state));
    return state as VoiceCapabilityState;
  }

  private static async inputAnswerUrlAddress(input: MultiStepInput, state: Partial<VoiceCapabilityState>) {
    state.answer_url_address = await input.showInputBox({
      title: this.title,
      step: 1,
      totalSteps: 6,
      value: typeof state.answer_url_address === 'string' ? state.answer_url_address : '',
      prompt: 'Answer Webhook Url',
      validate: this.validateAddress,
      shouldResume: this.shouldResume
    });
    return (input: MultiStepInput) => this.inputAnswerHttpMethod(input, state);
  }

  private static async inputAnswerHttpMethod(input: MultiStepInput, state: Partial<VoiceCapabilityState>) {
    const result = await input.showQuickPick({
      title: this.title,
      step: 2,
      totalSteps: 6,
      placeholder: 'Answer Webhook Http Method',
      items: getHTTPMethods(),
      activeItem: typeof state.answer_url_http_method !== 'string' ? state.answer_url_http_method : undefined,
      shouldResume: this.shouldResume,
    });
    state.answer_url_http_method = result.label;
    return (input: MultiStepInput) => this.inputFallbackUrlAddress(input, state);
  }

  private static async inputFallbackUrlAddress(input: MultiStepInput, state: Partial<VoiceCapabilityState>) {
    state.fallback_answer_url_address = await input.showInputBox({
      title: this.title,
      step: 3,
      totalSteps: 6,
      value: typeof state.fallback_answer_url_address === 'string' ? state.fallback_answer_url_address : '',
      prompt: 'Fallback Webhook Url',
      validate: this.validateAddress,
      shouldResume: this.shouldResume
    });
    return (input: MultiStepInput) => this.inputFallbackHttpMethod(input, state);
  }

  private static async inputFallbackHttpMethod(input: MultiStepInput, state: Partial<VoiceCapabilityState>) {
    const result = await input.showQuickPick({
      title: this.title,
      step: 4,
      totalSteps: 6,
      placeholder: 'Fallback Webhook Http Method',
      items: getHTTPMethods(),
      activeItem: typeof state.fallback_answer_url_http_method !== 'string' ? state.fallback_answer_url_http_method : undefined,
      shouldResume: this.shouldResume,
    });
    state.fallback_answer_url_http_method = result.label;
    return (input: MultiStepInput) => this.inputEventUrlAddress(input, state);
  }

  private static async inputEventUrlAddress(input: MultiStepInput, state: Partial<VoiceCapabilityState>) {
    state.event_url_address = await input.showInputBox({
      title: this.title,
      step: 5,
      totalSteps: 6,
      value: typeof state.event_url_address === 'string' ? state.event_url_address : '',
      prompt: 'Event Webhook Url',
      validate: this.validateAddress,
      shouldResume: this.shouldResume
    });
    return (input: MultiStepInput) => this.inputEventHttpMethod(input, state);
  }

  private static async inputEventHttpMethod(input: MultiStepInput, state: Partial<VoiceCapabilityState>) {
    const result = await input.showQuickPick({
      title: this.title,
      step: 6,
      totalSteps: 6,
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