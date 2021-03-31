import chai from 'chai';
import Sinon from 'sinon';
import * as vscode from 'vscode';
import { AuthCommands } from '../../../src/commands';
import { LocalTelemetry } from '../../../src/telemetry';
import { mocks, vonage } from '../../mocks';
import { Auth } from '../../../src/auth';
import { LoginFlow } from '../../../src/steps';

chai.should();

suite('Commands:Auth', function() {

  const telemetry: LocalTelemetry = new LocalTelemetry();
  const telemetrySendEvent = Sinon.stub(telemetry, 'sendEvent');
  
  const authCommands: AuthCommands = new AuthCommands(
    mocks.extensionContextMock.subscriptions,
    telemetry);

  this.afterEach(() => {
    telemetrySendEvent.reset();
  });

  test('login renders correct user flow', async () => {

    const loginFlowStub = Sinon.stub(LoginFlow, 'collectInputs').returns(Promise.resolve(vonage.loginStateInvalidMock));
    
    await authCommands.login();

    telemetrySendEvent.calledOnce.should.eq(true);
    loginFlowStub.calledOnce.should.eq(true);

    loginFlowStub.restore();
  });

  test('error message displays when missing api key or secret', async () => {
    const windowShowErrorMessageStub = Sinon.stub(vscode.window, 'showErrorMessage');
    const loginFlowStub = Sinon.stub(LoginFlow, 'collectInputs').returns(Promise.resolve(vonage.loginStateInvalidMock));

    await authCommands.login();

    windowShowErrorMessageStub.calledOnce.should.eq(true);

    windowShowErrorMessageStub.restore();
    loginFlowStub.restore();
  });

  test('calls Auth.login when api key and secret are provided', async () => {
    const loginFlowStub = Sinon.stub(LoginFlow, 'collectInputs').returns(Promise.resolve(vonage.loginStateValidMock));
    const authLoginStub = Sinon.stub(Auth, 'login');

    await authCommands.login();

    authLoginStub.calledOnce.should.eq(true);

    authLoginStub.restore();
    loginFlowStub.restore();
  });

  test('logout calls auth logout', async () => {
    const stub = Sinon.stub(Auth, 'logout');

    await authCommands.logout();

    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });
});