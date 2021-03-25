import chai from 'chai';
import Sinon from 'sinon';
import { AccountCommands } from '../../../src/commands';
import { LocalTelemetry } from '../../../src/telemetry';
import { AccountViewDataProvider } from '../../../src/views';
import { mocks } from '../../mocks/vscode';

chai.should();

suite('Commands:Account', () => {

  const telemetry = new LocalTelemetry();
  const telemetrySendEvent = Sinon.stub(telemetry, 'sendEvent');
  const viewProvider = new AccountViewDataProvider(mocks.extensionContextMock.globalState);

  const accountCommands = new AccountCommands(
    mocks.extensionContextMock.subscriptions,
    telemetry,
    viewProvider);

  test('Commands are registered and fire appropriately', async () => {
    accountCommands.refresh();
    telemetrySendEvent.calledOnce.should.eq(true);
  });
});