import { VonageClient } from "../client/vonageClient";
import { MultiStepInput } from "../utils";

export interface AssignNumberState {
  title: string;
  step: number;
  totalSteps: number;
  applicationId: string;
  name: string;
}

const title = 'Assign Number to Application';

export abstract class AssignNumberFlow {

  public static async collectInputs(): Promise<AssignNumberState> {
    const state = {} as Partial<AssignNumberState>;
    await MultiStepInput.run(input => this.selectApplication(input, state));
    return state as AssignNumberState;
  }

  private static async selectApplication(input: MultiStepInput, state: Partial<AssignNumberState>) {

    const applications = await VonageClient.application.getApplications();

    const result = await input.showQuickPick({
      title: title,
      step: 1,
      totalSteps: 1,
      placeholder: 'Choose Application',
      items: applications.map((a: any) => {
        return {
          label: a.name,
          description: a.id
        };
      }),
      shouldResume: this.shouldResume,
    });
    state.name = result.label;
    state.applicationId = result.description;
  }

  private static shouldResume() {
    // Could show a notification with the option to resume.
    return new Promise<boolean>((resolve, reject) => {
      // noop
    });
  }
}
