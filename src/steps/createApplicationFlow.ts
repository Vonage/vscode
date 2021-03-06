import { MultiStepInput } from "../utils";

export interface CreateApplicationState {
  title: string;
  step: number;
  totalSteps: number;
  name: string;
  public_key: string;
}

const title = 'Create Application';

export abstract class CreateApplicationFlow {

  public static async collectInputs(): Promise<CreateApplicationState> {
    let state = {} as Partial<CreateApplicationState>;
    await MultiStepInput.run(input => this.inputApplicationName(input, state));
    return state as CreateApplicationState;
  }

  private static async inputApplicationName(input: MultiStepInput, state: Partial<CreateApplicationState>) {
    state.name = await input.showInputBox({
      title,
      step: 1,
      totalSteps: 2,
      value: typeof state.name === 'string' ? state.name : '',
      prompt: 'Choose a name for the application',
      validate: this.validateName,
      shouldResume: this.shouldResume
    });
    return (input: MultiStepInput) => this.inputPublicKey(input, state);
  }

  private static async inputPublicKey(input: MultiStepInput, state: Partial<CreateApplicationState>) {
    state.public_key = await input.showInputBox({
      title,
      step: 2,
      totalSteps: 2,
      value: typeof state.public_key === 'string' ? state.public_key : '',
      prompt: 'Enter your public key for the application. (not required)',
      validate: this.validatePrivateKey,
      shouldResume: this.shouldResume
    });
  }

  private static shouldResume() {
    // Could show a notification with the option to resume.
    return new Promise<boolean>((resolve, reject) => {
      // noop
    });
  }

  private static async validateName(name: string) {
    return (name && name.trim().length > 0) ? undefined : 'Name is required';
  }

  private static async validatePrivateKey(privateKey: string) {
    return undefined;
  }
}
