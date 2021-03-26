import chai from 'chai';
import Sinon from 'sinon';
import { AuthCommands } from '../../../src/commands';
import { LocalTelemetry } from '../../../src/telemetry';
import { mocks } from '../../mocks';
import { Auth } from '../../../src/auth';
import { LoginFlow } from '../../../src/steps';

chai.should();

suite('Commands:Auth', function() {

  const telemetry = new LocalTelemetry();
  const telemetrySendEvent = Sinon.stub(telemetry, 'sendEvent');
  
  const authCommands = new AuthCommands(
    mocks.extensionContextMock.subscriptions,
    telemetry);

  this.beforeEach(() => {
    telemetrySendEvent.resetHistory();
  });

  this.afterAll(() => {
    telemetrySendEvent.restore();
  });

  test('login renders correct user flow', async () => {
    const loginFlowStub = Sinon.stub(LoginFlow, 'collectInputs');

    authCommands.login();

    telemetrySendEvent.calledOnce.should.eq(true);
    loginFlowStub.calledOnce.should.eq(true);
    loginFlowStub.restore();
  });

  test('logout calls auth logout', async () => {
    const stub = Sinon.stub(Auth, 'logout');

    authCommands.logout();

    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });
});