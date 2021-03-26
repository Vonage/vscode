import chai from 'chai';
import Sinon from 'sinon';
import { AccountCommands } from '../../../src/commands';
import { LocalTelemetry } from '../../../src/telemetry';
import { AccountViewDataProvider } from '../../../src/views';
import { mocks } from '../../mocks';

chai.should();

suite('Commands:Account', function() {

  const telemetry = new LocalTelemetry();
  const telemetrySendEvent = Sinon.stub(telemetry, 'sendEvent');
  const viewProvider = new AccountViewDataProvider(mocks.extensionContextMock.globalState);

  const accountCommands = new AccountCommands(
    mocks.extensionContextMock.subscriptions,
    telemetry,
    viewProvider);

  this.beforeEach(function() {
    telemetrySendEvent.resetHistory();
  });

  this.afterAll(function() {
    telemetrySendEvent.restore();
  });

  test('refresh calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'refresh');

    accountCommands.refresh();
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('toggleBalanceView calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'toggleBalanceView');

    accountCommands.toggleBalanceView();
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });
});